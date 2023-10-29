"use client";
import type { Post as PostType } from "../types/posts";
import { useContext, useEffect, useState } from "react";
import getTimeAgo from "../utils/TimeAgo";
import type { User } from "../types/user";
// import isEqual from "lodash/isEqual";
import Button from "./Button";
import CommentSection from "./CommentSection";
import {
  BookmarkIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  EllipsisHorizontalIcon,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { SessionContext } from "@/context/SessionContext";
import { getUser } from "@/services/users";
import useComponentVisible from "@/hooks/useComponentVisible";

const PostCard = ({
  post,
  deletePostHandler,
}: {
  post: PostType;
  deletePostHandler: (postID: string) => void;
}) => {
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(post.created_at));
  const [likes, setLikes] = useState(post.feedback.likes);
  const [postLiked, setPostLiked] = useState(
    likes.some((element) => {
      // return isEqual(element, user);
    })
  );
  const [visibleComments, setVisibleComments] = useState(false);
  const [postOwner, setPostOwner] = useState<User>();
  const { loggedUser } = useContext(SessionContext);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    getUser(post.userID).then((user) => user && setPostOwner(user));

    const intervalID = setInterval(
      () => setTimeAgo(getTimeAgo(post.created_at)),
      1000 * 60
    );

    return () => clearInterval(intervalID);
  }, []);

  const handleLikeBtn = () => {
    let currentUserIndex = likes.findIndex(
      (userId) => userId === loggedUser?.id
    );

    if (currentUserIndex === -1) {
      setLikes(likes.concat(loggedUser?.id!));
      setPostLiked(true);
    } else {
      likes.splice(currentUserIndex, 1);
      setLikes([...likes]);
      setPostLiked(false);
    }
  };

  return (
    <div className="rounded-md shadow-md p-3 divide-y-2 space-y-4 bg-white w-full">
      <div className="flex justify-between">
        <div ref={ref} className="flex space-x-2">
          <Image
            width={60}
            height={60}
            className="w-12 rounded-full"
            src={postOwner?.image || "/img/default-user.png"}
            alt="Profile image"
          />
          <div>
            <p className="font-medium">{postOwner?.name}</p>
            <p className="text-sm font-medium text-gray-500">{timeAgo}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsComponentVisible(!isComponentVisible)}
            className="flex place-content-center rounded-full w-10 h-10 hover:bg-gray-300"
          >
            <EllipsisHorizontalIcon
              width={24}
              className="self-center text-gray-500"
            />
          </button>

          {isComponentVisible && (
            <div
              ref={ref}
              className="flex flex-col absolute top-12 z-10 gap-2 bg-white border border-gray-200 rounded-md shadow-md p-4 w-64"
            >
              {post.userID === loggedUser?.id && (
                <div className="inline-flex gap-2 place-items-center">
                  <button
                    onClick={() => deletePostHandler(post.id)}
                    className="flex p-2 rounded-md hover:bg-gray-200 gap-2 w-full place-items-center"
                  >
                    <TrashIcon className="w-6" />
                    Mover a la papelera
                  </button>
                </div>
              )}
              <div className="inline-flex gap-2 place-items-center">
                <button className="flex p-2 rounded-md hover:bg-gray-200 gap-2 w-full place-items-center">
                  <BookmarkIcon className="w-6" />
                  Guardar enlace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-normal text-lg">{post.body.text}</p>
        {post.body.image && (
          <Image
            width={1920}
            height={1080}
            src={post.body.image}
            alt="Post image"
          />
        )}
        {(likes.length > 0 || post.feedback.comments.length > 0) && (
          <div className="grid grid-cols-2 mx-2">
            {likes.length > 0 && (
              <div className="inline-flex col-end-1 gap-2">
                <HandThumbUpIconSolid className="w-6 p-1 rounded-full bg-blue-600 text-white" />
                <p> {likes.length}</p>
              </div>
            )}
            {post.feedback.comments.length > 0 && (
              <div className="inline-flex col-end-3 justify-end">
                <p> {post.feedback.comments.length} comentario</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-2 font-medium text-gray-500">
        <Button onClick={handleLikeBtn}>
          {postLiked ? (
            <HandThumbUpIconSolid className="w-6 text-blue-600" />
          ) : (
            <HandThumbUpIcon className="w-6" />
          )}
          Me gusta
        </Button>
        <Button onClick={() => setVisibleComments(!visibleComments)}>
          <ChatBubbleLeftIcon className="w-6" />
          Comentar
        </Button>
        <Button>
          <ShareIcon className="w-6" />
          Compartir
        </Button>
      </div>
      {visibleComments && <CommentSection comments={post.feedback.comments} />}
    </div>
  );
};

export default PostCard;
