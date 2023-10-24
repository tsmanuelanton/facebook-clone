import type { APIRoute } from "astro";
import { addPost, getPost, getPosts } from "@/lib/firebase/firestore/posts";

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id");

  const json = id ? await getPost(id) : await getPosts();
  
  if (json == undefined) {
    return new Response(null, {
      status: 404,
    });
  }
  return new Response(JSON.stringify(json), {
    headers: { "content-type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
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
