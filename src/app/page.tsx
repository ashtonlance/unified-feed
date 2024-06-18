"use client";
import { PostItem } from "@/app/components/PostItem";
import { Spinner } from "@/app/components/Spinner";
import { Post } from "@/types";
import { getAuth, getFeed, getToken } from "@/utils/api";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
// Setup Axios interceptors to automatically add the Authorization header to requests
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default function Home() {
  const [feed, setFeed] = useState<{
    posts: Post[];
    pagination: { next_cursor: string | null };
  } | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const loader = useRef(null);

  // Fetch data when the component mounts or cursor changes
  useEffect(() => {
    const fetchData = async () => {
      await getAuth(); // Ensure the user is authenticated
      if (getToken()) {
        // Check if token is available after authentication
        const newFeed = await getFeed(cursor); // Fetch the feed data using the current cursor
        setFeed((prevFeed) => {
          if (prevFeed) {
            // If previous feed data exists, append new posts to it
            return {
              posts: [...prevFeed.posts, ...newFeed.posts],
              pagination: newFeed.pagination,
            };
          } else {
            // If no previous feed data, use new feed data
            return newFeed;
          }
        });
        setIsLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchData();
  }, [cursor]);

  // Intersection Observer to load more posts when the loader div is visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && feed?.pagination.next_cursor) {
          // If loader is visible and there is a next cursor, update the cursor state
          setCursor(feed.pagination.next_cursor);
        }
      },
      {
        root: null, // observing in relation to the viewport
        rootMargin: "20px", // margin around the root
        threshold: 1.0, // trigger when 100% of the loader is visible
      },
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader); // Start observing the loader element
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader); // Clean up observer on component unmount
      }
    };
  }, [feed?.pagination.next_cursor]);

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-12 lg:p-24">
      <h1 className="text-3xl font-bold text-center mb-4">Feed</h1>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="flex flex-col gap-4">
            {feed?.posts.map((post, idx) => (
              <PostItem key={post.id + idx} post={post} /> // Use post ID and index as key for list items
            ))}
          </ul>
        )}
        {!isLoading && (
          <div ref={loader} className="text-center">
            Loading more...
          </div>
        )}
      </div>
    </main>
  );
}
