import type { APIRoute } from "astro";
import type { User } from "../../types/user";

export const users: User[] = [
  {
    id: "0",
    image: "/img/minions.jpg",
    name: "Manuel Antón",
  },
  {
    id: "1",
    image: "/img/koala.jpg",
    name: "Milo",
  },
];

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id");
  const json = id ? users.at(+id) : users;

  if (json == undefined) {
    return new Response(null, {
      status: 404,
    });
  }
  return new Response(JSON.stringify(json), {
    headers: { "content-type": "application/json" },
  });
};
