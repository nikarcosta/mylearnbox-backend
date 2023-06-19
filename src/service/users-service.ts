import bcrypt from "bcrypt";
import { CreateUserParams } from "controllers/users-controller";
import usersRepository from "../repositories/users-repository";
import { duplicatedEmailError } from "../errors/index";

async function createUser({
  email,
  password,
  username,
  pictureUrl,
}: CreateUserParams) {
  await validateUniqueEmailOrFail(email);

  const hashPassword: string = await bcrypt.hash(password, 10);
  await usersRepository.createUser({
    email,
    password: hashPassword,
    username,
    pictureUrl,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await usersRepository.findUserByEmail(email);

  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const usersService = {
  createUser,
};

export default usersService;
