"use client";

import type {
  Post as PostType,
  PostBody as PostBodyType,
  Post,
} from "../types/posts";import { useState, type FormEvent } from "react";
import type { PostBody } from "../types/posts";
import type { User } from "../types/user";
import Button from "./Button";
import { useRouter } from "next/navigation";

const NewPost = ({ user }: { user: User }) => {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  const postAction = (e: FormEvent<HTMLFormElement>) => {
    if (text) addPost({ text });

    e.preventDefault();
  };

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

    router.refresh()

  //   const res = await fetch(baseUrl + "/api/posts");

  //   if (res.ok) {
  //     const newPosts: Post[] = await res.json();
  //     setPosts(newPosts);
  //   }
  };

  return (
    <div className="rounded-md shadow-md p-3 divide-y-2 space-y-4 bg-white w-full">
      <div className="flex space-x-2">
        <img
          className="w-12 rounded-full"
          src={user.image}
          alt="Profile image"
        />
        <form onSubmit={postAction} className="flex w-full gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="rounded-3xl w-full bg-gray-200 p-2"
            type="text"
            placeholder={`¿Que estás pensando, ${user.name}?`}
          />
          <Button
            type="submit"
            title="Publicar"
            className="p-2 border-2 rounded-md border-indigo-400"
          >
            Publicar
          </Button>
        </form>
      </div>
      <div className="flex justify-between pt-2 font-medium text-gray-500">
        <Button>
          <img className="mr-2" src="/img/live-video.png" />
          Video en directo
        </Button>

        <Button>
          <img className="mr-2" src="/img/images.png" />
          Foto/video
        </Button>

        <Button>
          <img className="mr-2" src="/img/happy-face.png" />
          Sentimiento/actividad
        </Button>
      </div>
    </div>
  );
};

export default NewPost;
