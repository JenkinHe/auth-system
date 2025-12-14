import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/entities/user.entity";
import { RefreshToken } from "./models/entities/refresh-token.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "mydb",
  entities: [User, RefreshToken],
  migrations: ["src/migrations/*.ts"],
  synchronize: false, // do NOT use in production
  logging: true,
});
