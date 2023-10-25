
import ProfileHeader from "@/components/ProfileHeader";
import ProfileNavBar from "@/components/ProfileNavBar";
import UserDetailsCard from "@/components/UserDetailsCard";
import PostCardList from "@/components/PostCardList";

const origin = "http://localhost:3000";

const getUser = async (id : string) => {
  const res = await fetch(`${origin}/api/users?id=${id}`)
  return res.json()
}

const getPosts = async () => {
  const res = await fetch(`${origin}/api/posts`, { cache: 'no-store' })
  return res.json()
}


export default async function Profile({ params }: { params: { userID: string } }) {
  // const [user, setUser] = useState<User>()
  // const [posts, setPosts] = useState<Post[]>([])
  const posts = await getPosts()
  const user = await getUser(params.userID)
  // const [friends, setFriends] = useState<User[]>([])
  // if (!loggedUserId) return Astro.redirect("/login");

  // const { origin } = Astro.url;

  // useEffect(() => {
    
  //   ).then(setUser)

  //   fetch(`${origin}/api/posts`).then((res) => res.json()).then(setPosts)
  // },[])

  // const friends: User[] = await Promise.all(
  //   user.friends.map(
  //     async (id) =>
  //       await fetch(`${origin}/api/users?id=${id}`).then((res) => res.json())
  //   )

  if (!user)
    return <div>Hola</div>

  return (
    <>
      <ProfileHeader user={user} />
  <ProfileNavBar/>
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
