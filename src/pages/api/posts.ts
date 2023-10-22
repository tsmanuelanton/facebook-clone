import type { APIRoute } from "astro";
import type { Post } from "../../types/posts";
import { users } from "./users";

export const posts: Post[] = [
  {
    id: "0",
    user: users[0],
    created_at: new Date("2023-10-12"),
    body: {
      text: "Me gusta más que el facebook original",
      image: "/img/ai-palace.png",
    },
    feedback: {
      likes: [users[1]],
      comments: [
        {
          id: "00",
          user: users[0],
          text: "A mí también aunque no te sorprenda.",
          created_at: new Date("2023-10-12"),
        },
        {
          id: "01",
          user: users[1],
          text: "Que imagen más chula.",
          created_at: new Date("2023-10-13"),
        },
      ],
    },
  },
  {
    id: "1",
    user: users[1],
    created_at: new Date("2023-10-10"),
    body: {
      text: "Hello, world! First Facebook post.",
    },
    feedback: {
      comments: [],
      likes: [],
    },
  },
];

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id");
  const json = id ? posts.at(+id) : posts;
  if (json == undefined) {
    return new Response(null, {
      status: 404,
    });
  }
  return new Response(JSON.stringify(posts), {
    headers: { "content-type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const post = await request.json();
  let body, options;

  if (post != undefined) {
    posts.push(post);
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
