export interface Post {
  id: string;
  title: string;
  description: string;
  attachments: {
    resource_type: string;
    uri: string;
    kind: string;
    thumbnail_uri: string;
    description: string;
  }[];
  author: {
    display_name: string;
    profile_pic: { uri: string } | null;
  };
  created_at: string;
  likes: number;
  liked: boolean;
}

export interface Attachment {
  kind: string;
  uri: string;
  description?: string;
  thumbnail_uri?: string;
}
