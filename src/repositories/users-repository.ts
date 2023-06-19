import prisma from "../config/database";

async function createUser({ email, password, username, pictureUrl }) {
  await prisma.users.create({
    data: {
      email,
      password,
      username,
      pictureUrl,
    },
  });
}

async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
}

const usersRepository = {
  createUser,
  findUserByEmail
};

export default usersRepository;
