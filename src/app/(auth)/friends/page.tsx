"use client";
import LSideBarCard from "@/components/LSideBarCard";
import { ChevronRightIcon, UsersIcon } from "@heroicons/react/24/solid";
import LinkButton from "@/components/LinkButton";
import { useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { getUser, getUsers } from "@/services/users";
import {
  addFriendRequest,
  changeStatusFriendRequest,
  getUserFriendRequests,
} from "@/services/friendRequests";
import { SessionContext } from "@/context/SessionContext";
import {
  FRIEND_REQUEST_STATUS,
  FriendRequestType,
} from "@/types/friendRequests";
import AddFriendCard from "@/components/AddFriendCard";
import FriendRequestCard from "@/components/FriendRequestCard";

export default function Home() {
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { loggedUser } = useContext(SessionContext);

  useEffect(() => {
    const loadData = async () => {
      if (loggedUser) {
        const newFriendRequests = await getUserFriendRequests(loggedUser.id);
        setFriendRequests(newFriendRequests);
        const newUsers = await getUsers();
        const loggedUserUpdated = await getUser(loggedUser.id);
        const filteredUsers = newUsers.filter(
          ({ id }) =>
            !loggedUserUpdated?.friends.includes(id) &&
            !newFriendRequests.find((request) => request.senderUserID == id) &&
            id !== loggedUser.id
        );
        setUsers(filteredUsers);
      }
    };
    if (loggedUser) loadData().catch(console.error);
  }, [loggedUser]);

  const acceptFriendRequest = async (
    friendRequestID: string,
    accepted: boolean
  ) => {
    if (loggedUser) {
      const newStatus = accepted
        ? FRIEND_REQUEST_STATUS.ACCEPTED
        : FRIEND_REQUEST_STATUS.DECLINED;
      await changeStatusFriendRequest(friendRequestID, newStatus);
      setFriendRequests((prevRequests) =>
        prevRequests.filter(({ id }) => id !== friendRequestID)
      );
    }
  };

  const sendFriedRequest = async (receiverUserID: string) => {
    if (loggedUser) {
      await addFriendRequest(receiverUserID);
      setUsers((prevUsers) =>
        prevUsers.filter(({ id }) => id !== receiverUserID)
      );
    }
  };

  return (
    <div className="flex h-full">
      <LSideBarCard title="Amigos">
        <LinkButton href="/friends">
          <UsersIcon className="w-9 p-2 bg-blue-500 rounded-full text-white" />
          <p>Inicio</p>
        </LinkButton>
        <LinkButton href="">
          <UsersIcon className="w-9 p-2 bg-gray-300 rounded-full" />
          <p>Solicitudes de amistas</p>
          <ChevronRightIcon className="w-6 absolute right-0" />
        </LinkButton>
        <LinkButton href="">
          <UsersIcon className="w-9 p-2 bg-gray-300 rounded-full" />
          <p>Todos los amigos</p>
          <ChevronRightIcon className="w-6 absolute right-0" />
        </LinkButton>
      </LSideBarCard>
      <main className="flex flex-col w-full p-8 gap-8 divide-y-2">
        <div className="space-y-4">
          <h2 className="font-bold text-lg">Solicitudes de amistad</h2>
          <div className="grid grid-cols-7 gap-4 w-full">
            {friendRequests.map((request) => (
              <FriendRequestCard
                key={request.id}
                friendRequest={request}
                acceptFriendRequest={acceptFriendRequest}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4 pt-4">
          <h2 className="font-bold text-lg">Otras personas</h2>
          <div className="grid grid-cols-7 gap-4 w-full">
            {users.map((user) => (
              <AddFriendCard key={user.id} user={user} sendFriedRequest={sendFriedRequest} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
