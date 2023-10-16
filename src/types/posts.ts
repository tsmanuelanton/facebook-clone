import type { User } from "./user";

export type Post = {
  id: string;
  user: User;
  created_at: Date;
  body: PostBody;
  feedback: {
    likes: User[];
    comments: PostComment[];
  };
};

export type PostBody = {
  text: string;
  image?: string;
}

export type PostComment = {
  id: string;
  user: User;
  text: string;
  created_at: Date;
}