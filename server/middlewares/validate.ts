import { Request, Response, NextFunction } from "express";
import type { Schema } from "yup";
import AppError from "../utils/AppError";

export const validate = (schema: Schema, source: "body" | "query" | "params" = "body") => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
      });
      if (source !== "query") {
        req[source] = validated;
      }
      next();
    } catch (err: unknown) {
      if (err instanceof Error && "errors" in err) {
        const yupErr = err as { errors?: string[] };
        const messages = yupErr.errors?.length ? yupErr.errors.join(", ") : err.message;
        next(new AppError(400, messages));
      } else {
        next(new AppError(400, "Validation failed"));
      }
    }
  };
};
