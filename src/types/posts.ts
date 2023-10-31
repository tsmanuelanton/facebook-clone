export type Post = {
  id: string;
  userID: string;
  created_at: Date;
  body: PostBody;
  feedback: {
    likes: string[];
    comments: string[];
  }
};

export type PostBody = {
  text: string;
  image?: string;
};

export type PostFeedback ={
  likes: string[];
  comments: string[];
};

export type UpdatePostType = {
  postID: string;
  body?: PostBody;
  feedback?: PostFeedback
};
