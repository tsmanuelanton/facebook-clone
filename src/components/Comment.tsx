import { getUser } from "@/services/users";
import { PostComment as PostCommentType } from "@/types/comments";
import { User } from "@/types/user";
import { useState, useContext, useEffect } from "react";
import getTimeAgo from "../utils/TimeAgo";
import { SessionContext } from "@/context/SessionContext";
import Image from "next/image";


type Props = {
  handleDeleteComment: (commentID : string) => void,
  comment: PostCommentType
}

const Comment = ({ comment, handleDeleteComment }: Props) => {
  const [user, setUser] = useState<User>();
  const { loggedUser } = useContext(SessionContext);

  useEffect(() => {
    getUser(comment.userID).then((user) => user && setUser(user));
  }, [comment.userID]);

  return (
    <div key={comment.id} className="flex m-2 gap-2 mr-10">
      <div className="flex-none w-8 p-0 m-0">
        <Image
          width={24}
          height={24}
          className="rounded-full w-8"
          src={user?.image || "/img/default-user.png"}
          alt="Profile image"
        />
      </div>
      <div>
        <div className=" bg-gray-200 rounded-3xl p-2 px-3">
          <p className="font-medium">{user?.name}</p>
          <p className="break-all">{comment?.body?.text}</p>
        </div>
        <div className="grid grid-flow-col gap-6 justify-items-stretch pb-1 pl-2 h-6">
          {loggedUser?.id === comment.userID && (
            <button onClick={() => handleDeleteComment(comment.id)} className="justify-self-start font-semibold text-gray-600 text-sm hover:underline self-end">
              Eliminar
            </button>
          )}
          <p className="text-gray-500 text-xs justify-self-end">
            {getTimeAgo(comment.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
