import type { User } from "./user";

export type Post = {
  id: number
  user: User;
  created_at: Date;
  body: {
    text: string;
    image?: string;
  };
};
