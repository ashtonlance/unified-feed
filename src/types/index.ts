export interface Post {
  id: string;
  title: string;
  description: string;
  attachments: { resource_type: string; uri: string; kind: string; thumbnail_uri: string; }[];
  author: {
    display_name: string;
    profile_pic: { uri: string } | null;
  };
  created_at: string;
  likes: number;
}