import Image from "next/image";
import PostCardList from "../../components/PostCardList";
import LeftNavBar from "../../components/LeftNavBar";
import type { User } from "@/types/user";
import { headers } from "next/headers";
import { getPosts } from "@/lib/firebase/firestore/posts";
import { getUser } from "@/lib/firebase/firestore/users";
import LinkButton from "@/components/LinkButton";

export default async function Home() {
  const userID = headers().get("userID")!;
  const posts = await getPosts();
  const user = await getUser(userID);

  const friends: User[] = await Promise.all(
    user.friends.map((id) => getUser(id))
  );

  return (
    <div className="flex place-content-center p-4">
      <div className="w-1/5">
        <LeftNavBar />
      </div>
      <main className="flex place-content-center w-3/5">
        <div className="w-2/3">
          <PostCardList posts={posts} />
        </div>
      </main>
      <div className="w-1/6">
        <div className="sticky top-20">
          <p className="font-medium text-lg text-gray-500">Contactos</p>
          {friends?.map((friend) => (
            <LinkButton key={friend.id} href={`/profile/${friend.id}`}>
              <Image
                src={friend.image}
                width={100}
                height={100}
                alt="User profile image"
                className="w-9 h-9 rounded-full object-cover"
              />
              <p className="font-medium self-center">{friend.name}</p>
            </LinkButton>
          ))}
        </div>
      </div>
    </div>
  );
}
