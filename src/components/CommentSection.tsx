import { useState, type FormEvent } from "react";
import type { PostComment as PostCommentType } from "../types/posts";
import Button from "./Button";
import getTimeAgo from "../utils/TimeAgo";
import type { User } from "@/types/user";

type Props = {
  comments: PostCommentType[];
  user: User
};

const CommentSection = ({ comments: postComments, user }: Props) => {
  const [comments, setComments] = useState(postComments);
  const [text, setText] = useState<string>("");

  const handleCommentBtn = (event: FormEvent<HTMLFormElement>) => {
    setComments(
      comments.concat({
        id: crypto.randomUUID(),
        user,
        text,
        created_at: new Date()
      })
    );
    setText("")
      event.preventDefault()
  };

  return (
    <div>
      <div className="max-h-80 overflow-y-scroll">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex m-2 gap-2 mr-10">
            <div className="flex-none w-8 p-0 m-0">
              <img
                className="rounded-full w-8"
                src={comment.user.image}
                alt="Profile image"
              />
            </div>

          <div>
            <div className=" bg-gray-200 rounded-3xl p-2 px-3">
              <p className="font-medium">{comment.user.name}</p>
              <p className="break-all">{comment.text}</p>
            </div>
            <p className="flex justify-end text-xs text-gray-500">{getTimeAgo(comment.created_at)}</p>
          </div>

          </div>
        ))}
      </div>

      <div className="sticky bg-white p-2 border-t">
        <div className="flex space-x-2">
          <img
            className="w-12 rounded-full"
            src="/img/minions.jpg"
            alt="Profile image"
          />
          <form onSubmit={(e) => handleCommentBtn(e)} className="flex w-full gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rounded-3xl w-full bg-gray-200 p-2"
              type="text"
              placeholder="Escribe algo..."
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
      </div>
    </div>
  );
};

export default CommentSection;
