import {
  createUploadthing,
  UploadThingError,
  type FileRouter,
} from "uploadthing/server";
import { ensureAdminSession } from "./auth.functions";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      try {
        const adminUser = await ensureAdminSession();
        return { userId: adminUser.user.id };
      } catch {
        throw new UploadThingError("Unauthorized");
      }
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
