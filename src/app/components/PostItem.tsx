import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const PostItem = memo(({ post }: { post: Post }) => (
  <li className="max-w-lg w-full mx-auto bg-white rounded-lg border border-gray-200 shadow-md hover:bg-slate-100 transition-colors">
    <Link href={`/post/${post.id}`} passHref>
      <div className="flex justify-between items-center p-5 flex-wrap gap-2">
        <div className="flex gap-4 items-center flex-wrap">
          {/* Conditional rendering: Only display the image if the profile picture URL exists */}
          {post.author.profile_pic?.uri && (
            <Image
              src={post.author.profile_pic.uri}
              alt="Profile picture"
              width={50}
              height={50}
              className="rounded-full self-stretch"
            />
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">
              {post.author.display_name}
            </span>
            {/* Display formatted date */}
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          {/* SVG icon for likes */}
          <svg
            className="text-red-500 mr-1 w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-gray-700">{post.likes}</span>
        </div>
      </div>
      <div className="p-5">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {post.title}
        </h2>
        <p className="mb-3 font-normal text-gray-700">{post.description}</p>
        {/* Check if there are attachments and if any of them are of type 'asset' */}
        {post.attachments.length > 0 &&
          post.attachments.some(
            (attachment) => attachment.resource_type === "asset",
          ) && (
            <h2 className="mb-2 font-bold tracking-tight text-gray-900">
              Attachments
            </h2>
          )}
        {/* Map through attachments and render based on their type */}
        {post.attachments.map((attachment, index) => {
          if (attachment.kind === "post_image") {
            return (
              <div key={index} className="my-2">
                <Image
                  src={attachment.uri}
                  alt={`Attachment ${attachment.description || index + 1}`}
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            );
          } else if (attachment.kind === "post_video") {
            return (
              <div key={index} className="my-2">
                <video
                  controls
                  width="500"
                  height="300"
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
    </Link>
  </li>
));

PostItem.displayName = "PostItem";
