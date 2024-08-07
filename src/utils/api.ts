import config from "@/config";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const instance = Axios.create();
const axios = setupCache(instance);

// Setup Axios interceptors to automatically add the Authorization header to requests
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const getAuth = async () => {
  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", config.USER);
    formData.append("password", config.PASSWORD);

    const response = await axios.post(
      `${config.API_HOST}/auth/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        cache: { interpretHeader: false, methods: ["post"] },
      },
    );
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
    const response = await axios.get(`${config.API_HOST}/feed`, {
      params: {
        cursor: cursor,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching feed:", error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const response = await axios.get(`${config.API_HOST}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
  }
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const submitPost = async (description: string) => {
  try {
    const response = await axios.post(
      `${config.API_HOST}/posts`,
      { description },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    console.log("Post submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting post:", error);
  }
};
