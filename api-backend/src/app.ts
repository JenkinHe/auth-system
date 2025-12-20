import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { useExpressServer } from "routing-controllers";

dotenv.config();

const app = express();

useExpressServer(app, {
  controllers: [__dirname + "/controllers/*.ts"],
  defaultErrorHandler: true,
});

export default app;
