import type { Post as PostType } from "../types/posts";
import { useEffect, useState } from "react";
import getTimeAgo from "../utils/TimeAgo";
import type { User } from "../types/user";
import isEqual from "lodash/isEqual";
import Button from "./Button";
import CommentSection from "./CommentSection";
import { ChatBubbleLeftIcon, HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";

const PostCard = ({ post, user }: { post: PostType; user: User }) => {
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(post.created_at));
  const [likes, setLikes] = useState(post.feedback.likes);
  const [postLiked, setPostLiked] = useState(
    likes.some((element) => {
      return isEqual(element, user);
    })
  );
  const [visibleComments, setVisibleComments] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(
      () => setTimeAgo(getTimeAgo(post.created_at)),
      1000 * 60
    );

    return () => clearInterval(intervalID);
  }, []);

  const handleLikeBtn = () => {
    let currentUserIndex = likes.findIndex((element) => {
      return isEqual(element, user);
    });

    if (currentUserIndex === -1) {
      setLikes(likes.concat(user));
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
        <img
          className="w-12 rounded-full"
          src={post.user.image}
          alt="Profile image"
        />
        <div>
          <p className="font-medium">{post.user.name}</p>
          <p className="text-sm font-medium text-gray-500">{timeAgo}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-normal text-lg">{post.body.text}</p>
        {post.body.image && <img src={post.body.image} alt="Post image" />}
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
      {visibleComments && <CommentSection user={user} comments={post.feedback.comments} />}
    </div>
  );
};

export default PostCard;
