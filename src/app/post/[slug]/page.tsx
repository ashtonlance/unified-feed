"use client";
import { Spinner } from "@/app/components/Spinner";
import { Post } from "@/types";
import { getAuth, getPostById, getToken } from "@/utils/api";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Setup axios interceptors to automatically add Authorization header to requests
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default function Page({ params }: { params: { slug: string } }) {
  const [page, setPage] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getAuth();
      if (getToken()) {
        const post = await getPostById(params.slug);
        setPage(post);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-12 lg:p-24">
      <button
        onClick={() => router.back()}
        className="mb-4 self-start font-medium text-blue-500 hover:text-blue-700"
      >
        Back
      </button>
      {isLoading ? (
        <Spinner />
      ) : (
        page && (
          <div className="flex flex-col gap-4 bg-white p-5 rounded-md">
            {page.title && <h1 className="text-3xl font-bold">{page.title}</h1>}
            <div className="flex justify-between items-center p-5 flex-wrap gap-2">
              <div className="flex gap-4 items-center flex-wrap">
                {page.author.profile_pic?.uri && (
                  <Image
                    src={page.author.profile_pic.uri}
                    alt="Profile picture"
                    width={50}
                    height={50}
                    className="rounded-full self-stretch"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    {page.author.display_name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(page.created_at).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="text-red-500 mr-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-gray-700">{page.likes}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 font-normal text-gray-700">
                {page.description}
              </p>
              {page.attachments.length > 0 &&
                page.attachments.some(
                  (attachment) => attachment.resource_type === "asset",
                ) && (
                  <h2 className="mb-2 font-bold tracking-tight text-gray-900">
                    Attachments
                  </h2>
                )}
              {page.attachments.map((attachment, index) => {
                if (attachment.kind === "post_image") {
                  return (
                    <div key={index} className="my-2">
                      <Image
                        src={attachment.uri}
                        alt={`Attachment ${index + 1}`}
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
                        poster={attachment.thumbnail_uri}
                      >
                        <source src={attachment.uri} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )
      )}
    </main>
  );
}
