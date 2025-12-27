import {
  JsonController,
  HttpCode,
  Get,
  Param,
  NotFoundError,
  UseBefore,
  CurrentUser,
} from "routing-controllers";
import { UserService } from "../services/user.service";
import { UserResponseDto } from "../dto/responseDtos/UserResponseDto";
import { AdminOnlyPath, verifyAccessToken } from "../middleware/authRequest";
import { UserRole } from "../models/entities/enums/user-role.enum";

@JsonController("/users")
export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  @Get("/:id")
  @HttpCode(201)
  @UseBefore(verifyAccessToken)
  async getUserById(@Param("id") id: string) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return UserResponseDto.fromEntity(user);
  }

  @Get("/:id/role")
  @HttpCode(201)
  @UseBefore(verifyAccessToken, AdminOnlyPath)
  async getUserRole(@CurrentUser() user: { id: string; roles: UserRole[] }) {
    return {
      userId: user?.id,
      roles: user?.roles,
    };
  }
}
