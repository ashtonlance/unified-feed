import { Attachment } from "@/types";
import Image from "next/image";

interface AttachmentsSliderProps {
  attachments: Attachment[];
}

export const AttachmentsSlider: React.FC<AttachmentsSliderProps> = ({
  attachments,
}) => {
  return (
    <div className="flex overflow-x-auto space-x-4 py-2">
      {attachments.map((attachment, index) => {
        if (attachment.kind === "post_image") {
          return (
            <div key={index} className="min-w-[200px] shrink-0">
              <Image
                src={attachment.uri}
                alt={`Attachment ${attachment.description || index + 1}`}
                width={250}
                height={150}
                className="rounded-lg"
              />
            </div>
          );
        } else if (attachment.kind === "post_video") {
          return (
            <div key={index} className="min-w-[200px] shrink-0">
              <video
                controls
                width={250}
                height={150}
                className="rounded-lg"
                poster={attachment.thumbnail_uri} // Use thumbnail_uri as poster
              >
                <source src={attachment.uri} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        }
      })}
    </div>
  );
};
