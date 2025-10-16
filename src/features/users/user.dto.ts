import z from "zod";

import { updateUserSchema, changePasswordSchema } from "./user.schema";

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;

