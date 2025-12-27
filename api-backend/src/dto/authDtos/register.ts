import { IsEmail, IsString, MinLength, Matches, IsArray } from "class-validator";
import { UserRole } from "../../models/entities/enums/user-role.enum";

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, {
    message: "Password must contain uppercase, lowercase and a number",
  })
  password!: string;

  @IsArray()
  role!: UserRole[];
}
