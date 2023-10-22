import type { APIRoute } from "astro";
import { users } from "./users";
import type { User } from "@/types/user";

type UserSignUpType = {
  name: string,
  surname: string,
  email: string,
  password: string
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const data : UserSignUpType = await request.json();

  let body,
    options = { headers: { "content-type": "application/json" }, status: 200 };

  try {
    const user = users.find((e) => e.email === data.email);
    if (user) {
      body = JSON.stringify({ res: `Email already registred` });
      options.status = 409;
    } else {
      body = JSON.stringify(user);

      const newUser : User = {
        ...data,
        id: ""+ users.length,
        image: "/img/default-user.png",
        friends: []
      }
      users.push(newUser)

      const now = new Date();
      now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
      cookies.set("loggedUser", newUser.id, { expires: now, path: "/" });
    }
  } catch (error) {
    body = null;
    options.status = 500;
  } finally {
    return new Response(body, options);
  }
};