import { JsonController, Post, Body, HttpCode } from "routing-controllers";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../dto/register";
import { LoginDto } from "../dto/login";

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
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
