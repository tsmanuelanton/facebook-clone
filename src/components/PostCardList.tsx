import { useState } from "react";
import type {
  Post as PostType,
  PostBody as PostBodyType,
  Post,
} from "../types/posts";
import type { User } from "../types/user";
import NewPostCard from "./NewPostCard";
import PostCard from "./PostCard";

type Props = {
  user: User;
  posts: PostType[];
};

const Posts = ({ user, posts: initialPosts }: Props) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = async (body: PostBodyType) => {
    const post: PostType = {
      id: crypto.randomUUID(),
      userID: user.id,
      created_at: new Date(),
      body,
      feedback: { likes: [], comments: [] },
    };

    const { protocol, host } = window.location;
    const baseUrl = `${protocol}//${host}`;

    // setPosts([post].concat(posts));
    await fetch(baseUrl + "/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    }).catch(console.error);

    const res = await fetch(baseUrl + "/api/posts");

    if (res.ok){
      const newPosts : Post[] = await res.json();
      setPosts(newPosts);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <NewPostCard user={user} addPost={addPost} />
      <div className="flex flex-col space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
