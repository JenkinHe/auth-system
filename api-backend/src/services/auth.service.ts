import bcrypt from "bcrypt";
import { RegisterDto } from "../dto/register";
import { LoginDto } from "../dto/login";
import { Repository } from "typeorm";
import { User } from "../models/entities/user.entity";
import { AppDataSource } from "../data-source";

const SALT_ROUNDS = 10;

export class AuthService {
  private userRepo!: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await this.verifyPassword(dto.password, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // JWT generation comes next
    return { message: "Login successful" };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await this.hashPassword(dto.password);

    const user = this.userRepo.create({
      email: dto.email,
      passwordHash,
    });

    await this.userRepo.save(user);

    return { message: "User registered successfully" };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
