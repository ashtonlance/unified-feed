"use client";
import { AttachmentsSlider } from "@/app/components/AttachmentsSlider";
import { Heart } from "@/app/components/Icons/Heart";
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
          <div className="flex flex-col max-w-lg w-full mx-auto gap-4 bg-white p-5 rounded-md">
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
                  <Heart />
                  <span className="text-gray-700">{page.likes}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 font-normal text-gray-700">
                {page.description}
              </p>
              <AttachmentsSlider attachments={page.attachments} />
            </div>
          </div>
        )
      )}
    </main>
  );
}
