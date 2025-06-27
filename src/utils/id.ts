import { randomBytes } from "crypto";

export const getId = (): string => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = randomBytes(1)[0] % alphabet.length;
    result += alphabet[randomIndex];
  }

  return result;
};
