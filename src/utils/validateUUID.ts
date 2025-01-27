import { z } from "zod";

export const validateUUID = (data: unknown) => {
  return z.string().uuid("Wrong id format").parse(data);
};
