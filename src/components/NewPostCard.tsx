"use client";

import { useState, useContext, FormEvent } from "react";
import Button from "./Button";
import Image from "next/image";
import { SessionContext } from "@/context/SessionContext";
import { PostBody } from "@/types/posts";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type Props = {
  addPostHandler: (post: PostBody) => void;
};

const NewPost = ({ addPostHandler }: Props) => {
  const [text, setText] = useState<string>("");
  const { loggedUser } = useContext(SessionContext);

  function handleOnSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (text) addPostHandler({ text });
    setText("");
  }

  return (
    <div className="rounded-md shadow-md p-3 divide-y-2 space-y-4 bg-white w-full">
      <div className="flex space-x-2">
        <Image
          width={64}
          height={64}
          className="w-12 rounded-full"
          src={loggedUser?.image || ""}
          alt="Profile image"
        />
        <form onSubmit={handleOnSubmit} className="flex w-full gap-2">
          <input
            value={text}
            onChange={({ target }) => setText(target.value)}
            className="w-11/12 rounded-2xl h- bg-gray-200 p-2 focus:outline-none"
            type="text"
            placeholder={`¿Que estás pensando, ${loggedUser?.name}?`}
          />
          <button disabled={text === ""} type="submit" title="Publicar">
            <PaperAirplaneIcon
              width={35}
              height={35}
              className={`${
                text === "" ? "text-gray-400" : "text-blue-500"
              } self-center`}
            />
          </button>
        </form>
      </div>
      <div className="flex justify-between pt-2 font-medium text-gray-500">
        <Button centerContent={true}>
          <Image
            width={24}
            height={24}
            alt="Icóno Video en directo"
            className="mr-2"
            src="/img/live-video.png"
          />
          Video en directo
        </Button>

        <Button centerContent={true}>
          <Image
            width={24}
            height={24}
            alt="Icóno Foto/video"
            className="mr-2"
            src="/img/images.png"
          />
          Foto/video
        </Button>

        <Button centerContent={true}>
          <Image
            width={24}
            height={24}
            alt="Icóno Sentimiento/actividad"
            className="mr-2"
            src="/img/happy-face.png"
          />
          Sentimiento/actividad
        </Button>
      </div>
    </div>
  );
};

export default NewPost;
