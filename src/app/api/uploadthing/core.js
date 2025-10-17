import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pitchDeckUploader: f({ 
    pdf: { maxFileSize: "16MB" }, 
    image: { maxFileSize: "8MB" } 
  })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete");
      console.log("file url", file.url);
      return { uploadedBy: "User" };
    }),
};
