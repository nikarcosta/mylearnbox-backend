import bcrypt from "bcrypt";
import { CreateUserParams } from "controllers/users-controller";
import usersRepository from "../repositories/users-repository";

async function createUser({
  email,
  password,
  username,
  pictureUrl,
}: CreateUserParams) {
  const hashPassword: string = await bcrypt.hash(password, 10);
  await usersRepository.createUser({
    email,
    password: hashPassword,
    username,
    pictureUrl,
  });
}

const usersService = {
  createUser,
};

export default usersService;
