import { getUsers } from "@/lib/firebase/firestore/users";
import type { User } from "@/types/user";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
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
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      cookies().set("loggedUser", user.id, {
        path: "/",
        expires: expirationDate,
      });

      return Response.json(user);
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
