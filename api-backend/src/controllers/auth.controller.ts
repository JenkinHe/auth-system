import { JsonController, Post, Body, HttpCode, UseBefore } from "routing-controllers";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../dto/authDtos/register";
import { LoginDto } from "../dto/authDtos/login";
import { RefreshToken } from "../models/entities/refresh-token.entity";
import { RefreshTokenDto } from "../dto/authDtos/token";
import { loginRateLimiter } from "../middleware/loginRateLimiter";

@JsonController("/auth")
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  @Post("/register")
  @HttpCode(201)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("/login")
  @UseBefore(loginRateLimiter)
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("/token")
  @HttpCode(200)
  async token(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewAccessTokenWithRefreshToken(dto);
  }
}
