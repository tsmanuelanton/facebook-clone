import { useState } from "react";
import type {
  Post as PostType,
  PostBody as PostBodyType,
} from "../types/posts";
import type { User } from "../types/user";
import NewPostCard from "./NewPostCard";
import PostCard from "./PostCard";

const Posts = ({
  user,
  posts: initialPosts,
}: {
  user: User;
  posts: PostType[];
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const addPost = (body: PostBodyType) => {
    const post: PostType = {
      id: 0,
      user,
      created_at: new Date(),
      body,
      feedback: { likes: [], comments: [] },
    };
    setPosts([{ ...post, id: posts.length + 1 }].concat(posts));
  };

  return (
    <div className="my-4 flex flex-col place-items-center space-y-4 w-full ">
      <NewPostCard user={user} addPost={addPost} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  );
};

export default Posts;
