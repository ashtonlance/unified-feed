import config from "@/config";
import axios from "axios";

export const getAuth = async () => {
  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", config.USER);
    formData.append("password", config.PASSWORD);

    const response = await axios.post(config.API_HOST, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response.data);
    localStorage.setItem("access_token", response.data.access_token);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export const getFeed = async (
  cursor: string | null = null,
  limit: number = 10,
) => {
  try {
    const response = await axios.get(
      `https://api.dev.unified.community/v1/feed`,
      {
        params: {
          cursor: cursor,
          limit: limit,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching feed:", error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const response = await axios.get(
      `https://api.dev.unified.community/v1/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
  }
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};
