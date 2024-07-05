"use client";
import { submitPost } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const description = (event.target as HTMLFormElement)?.description?.value;
    console.log(description, "description");
    try {
      submitPost(description);
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      (event.target as HTMLFormElement).description.value = "";
      router.push("/");
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-12 lg:p-24">
      <h1 className="text-3xl font-bold text-center mb-4">Add New Post</h1>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            id="description"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Write your post here..."
          />
          <button
            className="bg-blue-500 rounded-sm text-white font-bold mx-auto p-4"
            type="submit"
          >
            Submit New Post
          </button>
        </form>
      </div>
    </main>
  );
}
