import type { APIRoute } from "astro";
import type { User } from "@/types/user";
import { addUser, getUsers } from "@/lib/firebase/firestore/users";

type UserSignUpType = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const data: UserSignUpType = await request.json();

  let body,
    options = { headers: { "content-type": "application/json" }, status: 200 };

  try {
    const users = (await getUsers()) as User[];
    const user = users.find(({ email }) => email === data.email);
    if (user) {
      body = JSON.stringify({ res: `Email already registred` });
      options.status = 409;
    } else {
      body = JSON.stringify(user);
      const newUser: User = {
        ...data,
        id: "",
        image: "/img/default-user.png",
        friends: [],
      };

      const newUserID = await addUser(newUser)
      const now = new Date();
      now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
      cookies.set("loggedUser", newUserID, { expires: now, path: "/" });
    }
  } catch (error) {
    body = null;
    options.status = 500;
  } finally {
    return new Response(body, options);
  }
};
