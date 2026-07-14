import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (schema: any, source: "body" | "query" | "params" = "body") => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
      });
      req[source] = validated;
      next();
    } catch (err: unknown) {
      if (err instanceof Error && "inner" in err) {
        const yupErr = err as { inner?: Array<{ message: string }> };
        const messages = yupErr.inner
          ? yupErr.inner.map((e) => e.message).join(", ")
          : err.message;
        next(new AppError(400, messages));
      } else {
        next(new AppError(400, "Validation failed"));
      }
    }
  };
};
