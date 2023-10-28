"use client";
import type { Post as PostType } from "../types/posts";
import { useContext, useEffect, useState } from "react";
import getTimeAgo from "../utils/TimeAgo";
import type { User } from "../types/user";
// import isEqual from "lodash/isEqual";
import Button from "./Button";
import CommentSection from "./CommentSection";
import {
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { SessionContext } from "@/context/SessionContext";
import { getUser } from "@/services/users";

const PostCard = ({ post }: { post: PostType }) => {
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
      <div className="flex space-x-2">
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
      {visibleComments && (
        <CommentSection comments={post.feedback.comments} />
      )}
    </div>
  );
};

export default PostCard;
