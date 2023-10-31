import { useState, type FormEvent, useEffect, useContext, useRef } from "react";
import { SessionContext } from "@/context/SessionContext";
import Image from "next/image";
import { PostComment } from "@/types/comments";
import { createComment, deleteComment, getCommentsByPost } from "@/services/comments";
import { Post } from "@/types/posts";
import Comment from "./Comment";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type Props = {
  post: Post;
};

const CommentSection = ({ post }: Props) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const { loggedUser } = useContext(SessionContext);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [disableSendComment, setDisableSendComment] = useState(true);

  useEffect(() => {
    getCommentsByPost(post.id).then(setComments);
  }, [post]);

  const handleCommentBtn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const comment = commentInputRef.current?.value;
    if (comment) {
      await createComment({
        postID: post.id,
        body: { text: comment, image: null },
        commentID: null,
      });
      const newComments = await getCommentsByPost(post.id);
      setComments(newComments);

      commentInputRef.current!.value = "";
      commentsContainerRef.current?.scrollTo({ top: 0 });
    }
  };

  const  handleDeleteComment = async (commentID: string) => {
    await deleteComment(commentID)
    const newComments = await getCommentsByPost(post.id);
    setComments(newComments);
  }

  return (
    <>
      <div ref={commentsContainerRef} className="max-h-80 overflow-y-scroll">
        {comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} handleDeleteComment={handleDeleteComment} />
        ))}
      </div>

      <div className="sticky bg-white p-2 border-t">
        <div className="flex space-x-2">
          <div>
            <Image
              width={48}
              height={48}
              src={loggedUser?.image || "/img/default-user.png"}
              className=" w-8 rounded-full"
              alt="Profile image"
            />
          </div>

          <form
            onSubmit={handleCommentBtn}
            className="flex w-full gap-2 p-2 rounded-2xl bg-gray-200 "
          >
            <textarea
              ref={commentInputRef}
              onChange={({ target }) =>
                setDisableSendComment(target.textLength === 0)
              }
              className="w-full focus:outline-none bg-gray-200 resize-none"
              placeholder="Escribe algo..."
            />
            <button
              disabled={disableSendComment}
              type="submit"
              title="Publicar comentario"
              className="self-end"
            >
              <PaperAirplaneIcon
                width={20}
                height={20}
                className={`${
                  disableSendComment ? "text-gray-400" : "text-blue-500"
                }`}
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
