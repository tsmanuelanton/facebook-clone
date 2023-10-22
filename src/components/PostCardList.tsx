import { useState } from "react";
import type {
  Post as PostType,
  PostBody as PostBodyType,
} from "../types/posts";
import type { User } from "../types/user";
import NewPostCard from "./NewPostCard";
import PostCard from "./PostCard";

type Props = {
  user: User;
  posts: PostType[];
};

const Posts = ({ user, posts: initialPosts }: Props) => {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = async (body: PostBodyType) => {
    const post: PostType = {
      id: crypto.randomUUID(),
      user,
      created_at: new Date(),
      body,
      feedback: { likes: [], comments: [] },
    };
    const {protocol, host} = window.location;
    const baseUrl = `${protocol}//${host}`
    
    // setPosts([post].concat(posts));
    await fetch(baseUrl + "/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    }).catch(console.error);

    const res = await fetch(baseUrl + "/api/posts")
    const posts = await res.json()
    setPosts(posts)
  };

  return (
    <div className="flex flex-col place-items-center space-y-4 w-full ">
      <NewPostCard user={user} addPost={addPost} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  );
};

export default Posts;
