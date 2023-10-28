import { getUsers } from "@/lib/firebase/firestore/users";
import type { User } from "@/types/user";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

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
      const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
      
      const token = await new SignJWT({ userID: user.id })
      .setProtectedHeader({ alg: "HS256" }).sign(jwtSecret)
      cookies().set("jwt", token, {
        path: "/",
        expires: expirationDate,
      });

      return Response.json(user.id);
    } else {
      body = JSON.stringify({ res: `Wrong email or password` });
      options.status = 401;
    }
  } catch (error) {
    console.error(error)
    body = JSON.stringify(error);
    options.status = 500;
  }
  return new Response(body, options);
};
