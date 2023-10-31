import { addPost, getPosts } from "@/lib/firebase/firestore/posts";
import { Post } from "@/types/posts";

export const GET = async ({ url }: Request) => {
  const posts = await getPosts();

  if (posts == undefined) return Response.error();
  return Response.json(posts);
};

export const POST = async (request: Request) => {
  try {
    const { text } = await request.json();
    const userID = request.headers.get("userID")!;

    const post: Post = {
      id: "tempID",
      userID,
      body: { text },
      created_at: new Date(),
      feedback: {
        comments: [],
        likes: [],
      },
    };

    const newID = await addPost(post);
    console.log(newID)
    return Response.json({
      res: "Post uploaded successfully with id " + newID,
    });
  } catch {
    return new Response(null, {
      status: 400,
    });
  }
};
