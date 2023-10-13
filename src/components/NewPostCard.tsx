import { useState, type FormEvent } from "react";
import type { Post } from "../types/posts";
import type { User } from "../types/user";

const NewPost = ({
  user,
  addPost,
}: {
  user: User;
  addPost: (post: Post) => void;
}) => {
  const [text, setText] = useState<string>("");

  const postAction = (e: FormEvent<HTMLFormElement>) => {
    if (text) {
      addPost({
        id: 0,
        user,
        created_at: new Date(),
        body: { text },
      });
    }
    e.preventDefault();
  };

  return (
    <div className="rounded-md shadow-md w-2/3 p-3 divide-y-2 space-y-4 bg-white">
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
          <button
            type="submit"
            title="Publicar"
            className="p-2 border-2 rounded-md border-indigo-400"
          >
            Publicar
          </button>
        </form>
      </div>
      <div className="flex justify-between pt-2 font-medium text-gray-500">
        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200">
          <img
            className="mr-2"
            src="/img/live-video.png"
          />
          Video en directo
        </button>

        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200">
          <img
            className="mr-2"
            src="/img/images.png"
          />
          Foto/video
        </button>

        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200">
          <img
            className="mr-2"
            src="/img/happy-face.png"
          />
          Sentimiento/actividad
        </button>
      </div>
    </div>
  );
};

export default NewPost;
