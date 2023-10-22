import type { APIRoute } from "astro";
import type { User } from "../../types/user";

export const users: User[] = [
  {
    id: "0",
    email:"user0@email.com",
    image: "/img/minions.jpg",
    name: "Manuel Antón",
    password: "pass0"
  },
  {
    id: "1",
    email:"user1@email.com",
    image: "/img/koala.jpg",
    name: "Milo",
    password: "pass1"
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

export const POST: APIRoute = async ({ request }) => {
  const newUser = await request.json();

  let body, options;

  try {
    // check email is not already registred
    if (users.some(user => user.email === newUser.email)){
      body = JSON.stringify({ res: "Email already registred, try to log in." });
      options = {
        headers: { "content-type": "application/json" },
      };
      
    }else {
      // save user
      users.push({...newUser, id: users.length});
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
