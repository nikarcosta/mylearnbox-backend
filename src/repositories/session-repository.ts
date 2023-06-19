import prisma from "../config/database";

async function createSession(token: string, userId: number) {
  return await prisma.sessions.create({
    data: {
      userId,
      token,
    },
  });
}

const sessionRepository = {
  createSession,
};

export default sessionRepository;
