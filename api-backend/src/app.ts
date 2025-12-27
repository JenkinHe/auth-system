import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { Action, useExpressServer } from "routing-controllers";
import { AuthRequest } from "./middleware/authRequest";
import helmet from "helmet";

dotenv.config();

const app = express();

//only use in production
// app.use(helmet());

useExpressServer(app, {
  controllers: [__dirname + "/controllers/*.ts"],
  defaultErrorHandler: true,
  currentUserChecker: (action: Action) => {
    const req = action.request as AuthRequest;
    return req.user; // this is returned whenever you use @CurrentUser()
  },
});

export default app;
