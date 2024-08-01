/* eslint-disable no-restricted-properties */
import { z } from "zod";

export const env = {
  DATABASE_URL: z.string().url().parse(process.env.DATABASE_URL),
};
