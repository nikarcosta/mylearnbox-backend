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

const usersRepository = {
  createUser,
};

export default usersRepository;
