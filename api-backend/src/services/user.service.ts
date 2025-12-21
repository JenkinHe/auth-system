import { Repository } from "typeorm";
import { User } from "../models/entities/user.entity";
import { AppDataSource } from "../data-source";

export class UserService {
  private userRepo!: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
    });
  }
}
