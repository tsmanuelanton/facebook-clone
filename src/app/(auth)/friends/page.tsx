"use client";
import LSideBarCard from "@/components/LSideBarCard";
import { ChevronRightIcon, UsersIcon } from "@heroicons/react/24/solid";
import LinkButton from "@/components/LinkButton";
import AddFriendCard from "@/components/AddFriendCard";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { getUsers } from "@/services/users";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

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
      <main className="flex w-full p-8 h-max">
        <div className="grid grid-cols-7 gap-4 w-full">
          {
            users.map(user => <AddFriendCard key={user.id} user={user} />)
          }
        </div>
      </main>
    </div>
  );
}
