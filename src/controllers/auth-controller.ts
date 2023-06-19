import { Request, Response, NextFunction } from "express";
import { users } from "@prisma/client";
import httpStatus from "http-status";
import authService from "../service/auth-service";

async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as UserAuth;

  try {
    const token = await authService.signIn(email, password);
    res.status(httpStatus.OK).send({ token });
  } catch (err) {
    next(err);
  }
}

export type UserAuth = Omit<
  users,
  "id" | "username" | "pictureUrl" | "createdAt"
>;

const authController = {
  signIn,
};

export default authController;
