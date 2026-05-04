import { createServerFn } from "@tanstack/react-start";
import { db, social_links } from "@portfolio/database";
import { eq } from "drizzle-orm";
import {
  socialLinkInputSchema,
  socialLinkUpdateSchema,
} from "@portfolio/validation";
import { withErrorHandling } from "./lib/errors";
import { ERROR_MESSAGES } from "./lib/errorMessages";

export const getSocialLinks = createServerFn({ method: "GET" }).handler(() =>
  withErrorHandling(
    async () => {
      const linkData = await db.select().from(social_links);
      return linkData;
    },
    ERROR_MESSAGES.SOCIAL_LINK.FETCH_FAILED,
    500,
  ),
);

export const createSocialLink = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => socialLinkInputSchema.parse(data))
  .handler(async ({ data }) => {
    return withErrorHandling(async () => {
      const inserted = await db
        .insert(social_links)
        .values({
          platform: data.platform,
          url: data.url,
          icon: data.icon,
        })
        .returning();
      return inserted[0];
    }, ERROR_MESSAGES.SOCIAL_LINK.CREATE_FAILED);
  });

export const updateSocialLink = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => socialLinkUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    return withErrorHandling(async () => {
      const { id, ...updateData } = data;
      const updated = await db
        .update(social_links)
        .set(updateData)
        .where(eq(social_links.id, id))
        .returning();
      return updated[0];
    }, ERROR_MESSAGES.SOCIAL_LINK.UPDATE_FAILED);
  });

export const deleteSocialLink = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    return withErrorHandling(async () => {
      await db.delete(social_links).where(eq(social_links.id, id));
      return null;
    }, ERROR_MESSAGES.SOCIAL_LINK.DELETE_FAILED);
  });
