import { getUsers } from "@/lib/firebase/firestore/users";
import type { User } from "@/types/user";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const input = await request.json();

  let body,
    options = { headers: { "content-type": "application/json" }, status: 200 };

  try {
    const users = (await getUsers()) as User[];

    const user = users.find(
      ({ email, password }) =>
        email === input.email && password === input.password
    );

    if (user) {
      body = JSON.stringify(user);
      const now = new Date();
      now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
      cookies.set("loggedUser", user.id, { expires: now, path: "/" });
      return redirect("/", 307);
    } else {
      body = JSON.stringify({ res: `Wrong email or password` });
      options.status = 401;
    }
  } catch (error) {
    body = JSON.stringify(error);
    options.status = 500;
  } finally {
    return new Response(body, options);
  }
};
