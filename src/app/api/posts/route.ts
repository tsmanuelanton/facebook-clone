import { addPost, getPost, getPosts } from "@/lib/firebase/firestore/posts";
import { Post } from "@/types/posts";

export const GET = async ({ url }: Request) => {
  const { searchParams } = new URL(url);
  const id = searchParams.get("id");

  const json = id ? await getPost(id) : await getPosts();

  if (json == undefined)
    return Response.error();
  return Response.json(json);
};

export const POST = async (request: Request) => {
  const data = await request.json();

  const userID = request.headers.get("userID")!;
  try {
    const post: Post = {
      id: "tempID",
      userID,
      body: data.body,
      created_at: new Date(),
      feedback: {
        comments: [],
        likes: [],
      },
    };
    const id = await addPost(post);
    return Response.json({ res: "Post uploaded successfully with id " + id });
  } catch {
    return new Response(null, {
      status: 400,
    });
  }
};
