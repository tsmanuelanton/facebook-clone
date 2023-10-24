export type Post = {
  id: string;
  userID: string;
  created_at: Date;
  body: PostBody;
  feedback: {
    likes: string[];
    comments: PostComment[];
  };
};

export type PostBody = {
  text: string;
  image?: string;
}

export type PostComment = {
  id: string;
  userID: string;
  text: string;
  created_at: Date;
}