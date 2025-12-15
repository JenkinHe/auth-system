import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { useExpressServer } from "routing-controllers";
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();

useExpressServer(app, {
  controllers: [__dirname + "/controllers/*.ts"],
});

export default app;
