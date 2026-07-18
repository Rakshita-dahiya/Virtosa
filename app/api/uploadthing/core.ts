import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
  console.log(" Upload Complete:", file.ufsUrl);

  return {
    fileUrl: file.ufsUrl,
  };
}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;