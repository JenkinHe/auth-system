import {
  JsonController,
  HttpCode,
  Get,
  Param,
  NotFoundError,
  UseBefore,
} from "routing-controllers";
import { UserService } from "../services/user.service";
import { UserResponseDto } from "../dto/responseDtos/UserResponseDto";
import { verifyAccessToken } from "../middleware/authRequest";

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
}
