import Joi from "joi";
import { CreateUserParams } from "controllers/users-controller";

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(6).required(),
  pictureUrl: Joi.string().required(),
});
