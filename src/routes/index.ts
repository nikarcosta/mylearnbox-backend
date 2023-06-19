import { Router } from "express";
import { userRouter } from "./users-router";
import { authRouter } from "./authentication-router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
