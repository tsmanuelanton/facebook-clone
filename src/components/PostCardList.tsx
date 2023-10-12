import { useState, type FormEvent, Suspense } from "react";
import type { Post as PostType } from "../types/posts";
import type { User } from "../types/user";
import NewPostCard from "./NewPostCard";
import PostCard from "./PostCard";

const Posts = ({ user, posts : initialPosts }: { user: User; posts: PostType[] }) => {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (post: PostType) => {
    setPosts([{ ...post, id: posts.length + 1 }].concat(posts));
  };

  return (
    <div className="my-4 flex flex-col place-items-center space-y-4 w-full ">
      <NewPostCard user={user} addPost={addPost} />
      <Suspense>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      </Suspense>
      
    </div>
  );
};

export default Posts;
