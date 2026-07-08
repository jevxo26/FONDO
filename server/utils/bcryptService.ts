import bcrypt from 'bcrypt';
import { catchServiceAsync } from "./catchServiceAsync";

export const encryptPassword = catchServiceAsync(async (password: string): Promise<string> => {
  if (!password) {
    throw new Error("Password is required for encryption");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
});