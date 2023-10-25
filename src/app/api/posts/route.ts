import { addPost, getPost, getPosts } from "@/lib/firebase/firestore/posts";

export const GET = async ({ url } : Request) => {
  const {searchParams} = new URL(url)
  const id = searchParams.get("id");

  const json = id ? await getPost(id) : await getPosts();
  
  if (json == undefined) {
    return Response.error()
  }
  return Response.json(json)
};

export const POST = async (request : Request) => {
  const post = await request.json();
  let body, options;

  if (post != undefined) {
    await addPost(post)
    body = JSON.stringify({ res: "Post uploaded successfully" });
    options = {
      headers: { "content-type": "application/json" },
    };
  } else {
    body = null;
    options = {
      status: 400,
    };
  }
  return new Response(body, options);
};
