import { AttachmentsSlider } from "@/app/components/AttachmentsSlider";
import { Heart } from "@/app/components/Icons/Heart";
import { Post } from "@/types";
import { formatDate } from "@/utils/dates";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const PostItem = memo(
  ({ post }: { post: Post }) => (
    console.log(post),
    (
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
                <span className="text-sm text-gray-400">
                  {formatDate(post.created_at)}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Heart />
              <span className="text-gray-700">{post.likes}</span>
            </div>
          </div>
          <div className="p-5">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {post.title}
            </h2>
            <p className="mb-3 font-normal text-gray-700">{post.description}</p>
            <AttachmentsSlider attachments={post.attachments} />
          </div>
        </Link>
      </li>
    )
  ),
);

PostItem.displayName = "PostItem";
