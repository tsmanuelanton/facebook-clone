import Image from "next/image";
import PostList from "../components/PostCardList";
import LeftNavBar from "../components/LeftNavBar";
import type { User } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const origin = "http://localhost:3000";

const loggedUserId = cookies().get("loggedUser")?.value;
const getUser = async (id: string) => {
  const res = await fetch(`${origin}/api/users?id=${id}`);
  return res.json();
};

const getPosts = async () => {
  const res = await fetch(`${origin}/api/posts`, { cache: "no-store" });
  return res.json();
};

export default async function Home() {
  if (!loggedUserId) redirect("/login");

  const posts = await getPosts();
  const user: User = await getUser(loggedUserId);

  const friends: User[] = await Promise.all(
    user.friends.map((id) => getUser(id))
  );

  return (
    <div className="flex place-content-center p-4">
      <div className="w-1/5">
        <LeftNavBar user={user} />
      </div>
      <main className="flex place-content-center w-3/5">
        <div className="w-2/3">
          <PostList user={user} posts={posts} />
        </div>
      </main>
      <div className="w-1/6">
        <div className="sticky top-20">
          <p className="font-medium text-lg text-gray-500">Contactos</p>
          {friends?.map((friend) => (
            <Link
              key={friend.id}
              href={`/profile/${friend.id}`}
              className="flex p-2 rounded-md hover:bg-gray-200 gap-2"
            >
              <Image
                src={friend.image}
                width={100}
                height={100}
                alt="User profile image"
                className="w-9 h-9 rounded-full object-cover"
              />
              <p className="font-medium self-center">{friend.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
