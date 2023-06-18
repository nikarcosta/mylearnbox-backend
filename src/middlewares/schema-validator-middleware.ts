import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { conflictError } from "../errors/index";

export default function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((detail) => detail.message).join(" ");
        throw conflictError(errors);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
