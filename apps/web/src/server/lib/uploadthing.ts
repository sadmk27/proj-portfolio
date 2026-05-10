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
    .middleware(async ({ req }) => {
      const adminUser = await ensureAdminSession(req);

      if (!adminUser) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: adminUser.user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
