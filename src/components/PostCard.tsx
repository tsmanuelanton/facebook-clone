import type { Post as PostType } from "../types/posts";
import { useEffect, useState } from "react";
import getTimeAgo from "../utils/TimeAgo";
import { CommentIcon, LikeIcon, ShareIcon } from "../utils/icons";

const PostCard = ({ post }: { post: PostType }) => {
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(post.created_at));

  useEffect(() => {
    const intervalID = setInterval(
      () => setTimeAgo(getTimeAgo(post.created_at)),
      1000 * 60
    );

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="rounded-md shadow-md w-2/3 p-3 divide-y-2 space-y-4 bg-white ">
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
      <div className="gap-2">
        <p className="font-normal text-lg">{post.body.text}</p>
        {post.body.image && <img src={post.body.image} alt="Post image" />}
      </div>
      <div className="flex justify-between pt-2 font-medium text-gray-500">
        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200 gap-2">
          <LikeIcon/>
          Me gusta
        </button>
        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200 gap-2">
          <CommentIcon/>
          Comentar
        </button>
        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200 gap-2">
          <ShareIcon/>
          Compartir
        </button>
      </div>
    </div>
  );
};

export default PostCard;
