import { useState, type FormEvent } from "react";
import type { PostBody } from "../types/posts";
import type { User } from "../types/user";
import Button from "./Button";

const NewPost = ({
  user,
  addPost,
}: {
  user: User;
  addPost: (post: PostBody) => void;
}) => {
  const [text, setText] = useState<string>("");

  const postAction = (e: FormEvent<HTMLFormElement>) => {
    if (text) addPost({ text });

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
