import type {
  Post as PostType,
  PostBody as PostBodyType,
  Post,
} from "../types/posts";
import type { User } from "../types/user";
import NewPostCard from "./NewPostCard";
import PostCard from "./PostCard";

type Props = {
  user: User;
  posts: PostType[];
};

const PostCardList = ({ user, posts: initialPosts }: Props) => {
  // const [posts, setPosts] = useState<Post[]>(initialPosts);

  return (
    <div className="flex flex-col space-y-4">
      <NewPostCard user={user} />
      <div className="flex flex-col space-y-4">
        {initialPosts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};

export default PostCardList;
