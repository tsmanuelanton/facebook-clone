"use client"
import { createPost, getPosts } from "@/services/posts";
import type { PostBody, Post as PostType } from "../types/posts";
import NewPostCard from "./NewPostCard";
import PostCard from "./PostCard";
import { useState } from "react";

type Props = {
  posts: PostType[];
};

const PostCardList = ({ posts: initialPosts }: Props) => {
  const [posts, setPosts] = useState(initialPosts)

  const addPostHandler = async (post: PostBody) => {
    await createPost(post);
    const newPosts = await getPosts()
    setPosts(newPosts)
  };

  return (
    <div className="flex flex-col space-y-4">
      <NewPostCard addPostHandler={addPostHandler}/>
      <div className="flex flex-col space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostCardList;
