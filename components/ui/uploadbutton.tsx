"use client";

import { UploadButton } from "@/lib/uploadthing";

interface UploadResumeProps {
  onUploadComplete: (url: string) => void;
}

export default function UploadResume({
  onUploadComplete,
}: UploadResumeProps) {
  return (
    <UploadButton
      endpoint="resumeUploader"
      appearance={{
        button:
          "!bg-transparent !text-black !p-0 !h-auto hover:!bg-transparent",
        allowedContent: "!text-gray-500",
      }}
      onClientUploadComplete={(res) => {
        if (res?.[0]) {
          onUploadComplete(res[0].serverData.fileUrl);
        }
      }}
      onUploadError={(error) => {
        alert(`Upload failed: ${error.message}`);
      }}
    />
  );
}