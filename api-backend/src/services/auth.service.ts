import bcrypt from "bcrypt";
import { RegisterDto } from "../dto/authDtos/register";
import { LoginDto } from "../dto/authDtos/login";
import { DataSource, IsNull, Repository } from "typeorm";
import { User } from "../models/entities/user.entity";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../models/entities/refresh-token.entity";
import { generateAccessToken, generateRefreshToken, hashRefreshToken } from "../utils/token.util";
import { RefreshTokenDto } from "../dto/authDtos/token";
import { AuthError } from "../errors/AuthError";
import { ValidationError } from "../errors/ValidationError";

const SALT_ROUNDS = 10;

export class AuthService {
  private dataSource!: DataSource;
  private userRepo!: Repository<User>;
  private refreshRepo!: Repository<RefreshToken>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.refreshRepo = AppDataSource.getRepository(RefreshToken);
    this.dataSource = AppDataSource;
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new AuthError("Invalid credentials");
    }

    const isValid = await this.verifyPassword(dto.password, user.passwordHash);

    if (!isValid) {
      throw new AuthError("Invalid credentials");
    }

    const accessToken = generateAccessToken({
      id: user.id,
      roles: user.roles,
    });

    const refreshToken = generateRefreshToken();

    const refreshTokenEntity = this.refreshRepo.create({
      user: { id: user.id },
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt: new Date(
        Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) * 24 * 60 * 60 * 1000
      ),
    });

    await this.refreshRepo.save(refreshTokenEntity);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ValidationError("User already exists");
    }

    const passwordHash = await this.hashPassword(dto.password);

    const user = this.userRepo.create({
      email: dto.email,
      passwordHash: passwordHash,
      roles: dto.role,
    });

    await this.userRepo.save(user);

    return { message: "User registered successfully" };
  }

  async getNewAccessTokenWithRefreshToken(dto: RefreshTokenDto) {
    return this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(RefreshToken);

      //get refresh token
      const refreshToken = await repo.findOne({
        where: { tokenHash: hashRefreshToken(dto.refreshToken) },
        relations: ["user"], // load relations in at runtime,
        lock: { mode: "pessimistic_write", tables: ["refresh_tokens"] }, // prevents 2 request using same refresh token at once
      });

      //check validity
      if (!refreshToken || refreshToken.revokedAt !== null) {
        throw new AuthError("Invalid refresh token");
      }

      try {
        // update revoked status
        const result = await repo.update(
          { id: refreshToken.id, revokedAt: IsNull() },
          { revokedAt: () => "CURRENT_TIMESTAMP" }
        );

        //make sure its not used
        if (result.affected === 0) {
          throw new AuthError("Refresh token already used");
        }
      } catch (err) {
        throw new AuthError("Database error while revoking token");
      }

      const newRefreshToken = generateRefreshToken();

      // enter neew refresh token in db
      const newRefreshTokenEntity = repo.create({
        user: { id: refreshToken.user.id },
        tokenHash: hashRefreshToken(newRefreshToken),
        expiresAt: new Date(
          Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) * 24 * 60 * 60 * 1000
        ),
      });

      const savedToken = await repo.save(newRefreshTokenEntity);

      if (!savedToken || !savedToken.id) {
        throw new AuthError("Refresh token save failed");
      }

      //make new access token
      const accessToken = generateAccessToken({
        id: refreshToken.user.id,
        roles: refreshToken.user.roles,
      });

      return { accessToken, newRefreshToken };
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
