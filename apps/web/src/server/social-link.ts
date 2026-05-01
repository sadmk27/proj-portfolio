import { createServerFn } from "@tanstack/react-start";
import { db, social_links } from "@portfolio/database";
import { eq } from "drizzle-orm";
import {
  socialLinkInputSchema,
  socialLinkUpdateSchema,
} from "@portfolio/validation";

export const getSocialLinks = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const linkData = await db.select().from(social_links);
      return { success: true as const, data: linkData };
    } catch (err) {
      if (err instanceof Error) {
        return {
          success: false as const,
          error: "Failed to fetch social links",
          details: err.message,
        };
      }
      return { success: false as const, error: "Failed to fetch social links" };
    }
  },
);

export const createSocialLink = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => socialLinkInputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const inserted = await db
        .insert(social_links)
        .values({
          platform: data.platform,
          url: data.url,
          icon: data.icon,
        })
        .returning();
      return { success: true as const, data: inserted[0] };
    } catch {
      return { success: false as const, error: "Failed to create social link" };
    }
  });

export const updateSocialLink = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => socialLinkUpdateSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { id, ...updateData } = data;
      const updated = await db
        .update(social_links)
        .set(updateData)
        .where(eq(social_links.id, id))
        .returning();
      return { success: true as const, data: updated[0] };
    } catch {
      return { success: false as const, error: "Failed to update social link" };
    }
  });

export const deleteSocialLink = createServerFn({ method: "POST" })
  .inputValidator((id: unknown) => {
    if (typeof id !== "number") throw new Error("Invalid id");
    return id;
  })
  .handler(async ({ data: id }) => {
    try {
      await db.delete(social_links).where(eq(social_links.id, id));
      return { success: true as const };
    } catch {
      return { success: false as const, error: "Failed to delete social link" };
    }
  });
