import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { exclude } from "../utils/prisma-utils";
import usersRepository from "../repositories/users-repository";
import sessionRepository from "../repositories/session-repository";
import { invalidCredentialsError } from "../errors/index";

async function signIn(email: string, password: string) {
  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string) {
  const user = await usersRepository.findUserByEmail(email);

  if (!user) throw invalidCredentialsError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);

  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  await sessionRepository.createSession(token, userId);

  return token;
}
const authService = {
  signIn,
};

export default authService;
