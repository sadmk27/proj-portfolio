import { z } from "@portfolio/validation";

export const themeValidator = z.enum(["light", "dark", "system"]);
export type Theme = z.infer<typeof themeValidator>;
