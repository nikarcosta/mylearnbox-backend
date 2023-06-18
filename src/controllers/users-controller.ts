import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { users } from "@prisma/client";
import usersService from "../service/users-service";

async function createUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, username, pictureUrl } =
    req.body as CreateUserParams;
  try {
    await usersService.createUser({ email, password, username, pictureUrl });
    return res.status(httpStatus.CREATED).send({});
  } catch (err) {
    return next(err);
  }
}

export type CreateUserParams = Omit<users, "id" | "createdAt">;

const usersController = {
  createUser,
};

export default usersController;
