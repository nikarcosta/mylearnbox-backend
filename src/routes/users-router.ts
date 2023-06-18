import { Router } from "express";
import usersController from "../controllers/users-controller";
import validateSchemaMiddleware from "../middlewares/schema-validator-middleware";
import { createUserSchema } from "../schemas/users-schema";

export const userRouter = Router();

userRouter.post(
  "/",
  validateSchemaMiddleware(createUserSchema),
  usersController.createUser
);
