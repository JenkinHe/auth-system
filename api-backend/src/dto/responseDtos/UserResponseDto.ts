import { User } from "../../models/entities/user.entity";

export class UserResponseDto {
  id!: string;
  email!: string;
  description?: string | null | undefined;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      description: user.description,
    };
  }
}
