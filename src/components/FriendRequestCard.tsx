import { getUser } from "@/services/users";
import { FriendRequestType } from "@/types/friendRequests";
import { User } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  friendRequest: FriendRequestType;
  acceptFriendRequest: (friendRequestID : string, accepted : boolean) => void
};


const FriendRequestCard = ({ friendRequest, acceptFriendRequest }: Props) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    getUser(friendRequest.senderUserID).then(user => user && setUser(user))
  }, [friendRequest])

  if (!user)
    return <div></div>

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="h-56 relative">
        <a href={`/profile/${user.id}`}>
          <Image
            src={user.image}
            fill={true}
            title={`${user.name}`}
            alt={`Imagen de perfil de ${user.name}`}
            className="rounded-t-lg"
          />
        </a>
      </div>
      <div className="p-3 font-medium">
          <a href={`/profile/${user.id}`} className="hover:underline">
            {user.name}
          </a>
        <div className="flex flex-col gap-2 mt-6">
          <button onClick={() => acceptFriendRequest(friendRequest.id, true)} className="p-1 bg-blue-500 text-white rounded-md">
            Confirmar
          </button>
          <button onClick={() => acceptFriendRequest(friendRequest.id, false)} className="p-1 bg-gray-200 rounded-md">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
