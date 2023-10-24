import type { APIRoute } from "astro";
import { getUsers, getUser, addUser } from "@/lib/firebase/firestore/users";

export const GET: APIRoute = async ({ url }) => {

  const id = url.searchParams.get("id");
  const json = id ? await getUser(id) : await getUsers();

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
  const newUser = await request.json();

  let body, options;

  try {
    const users  = await getUsers()
    // check email is not already registred
    if (users.some((user) => user.email === newUser.email)) {
      body = JSON.stringify({ res: "Email already registred, try to log in." });
      options = {
        headers: { "content-type": "application/json" },
      };
    } else {
      // save user
      addUser(newUser)
      body = JSON.stringify({ res: "User registred successfully" });
      options = {
        headers: { "content-type": "application/json" },
      };
    }
  } catch (error) {
    body = null;
    options = {
      status: 500,
    };
  } finally {
    return new Response(body, options);
  }
};
