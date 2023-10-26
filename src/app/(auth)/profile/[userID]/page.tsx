import ProfileHeader from "@/components/ProfileHeader";
import ProfileNavBar from "@/components/ProfileNavBar";
import UserDetailsCard from "@/components/UserDetailsCard";
import PostCardList from "@/components/PostCardList";
import { getPosts } from "@/lib/firebase/firestore/posts";
import { getUser } from "@/lib/firebase/firestore/users";

export default async function Profile({
  params,
}: {
  params: { userID: string };
}) {
  const posts = await getPosts();
  const user = await getUser(params.userID);

  return (
    <>
      <ProfileHeader user={user} />
      <ProfileNavBar />
      <main className="flex place-content-center">
        <div className="w-4/6 py-4 px-8">
          <div className="flex gap-4 place-content-center">
            <div className="flex flex-col w-2/5 sticky top-20 h-fit gap-4">
              <UserDetailsCard />
            </div>
            <div className="w-3/5">
              <PostCardList user={user} posts={posts} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
