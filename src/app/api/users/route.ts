import { getUsers, getUser, addUser } from "@/lib/firebase/firestore/users";
import { User } from "@/types/user";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const json = id ? await getUser(id) : await getUsers();
  if (json == undefined) {
    return new Response(null, {
      status: 404,
    });
  }
  return Response.json(json);
};

export const POST = async (request: Request) => {
  const newUser = await request.json();

  try {
    const users = (await getUsers()) as User[];
    // check email is not already registred
    if (users.some((user) => user.email === newUser.email)) {
      return Response.json({ res: "Email already registred, try to log in." });
    } else {
      // save user
      addUser(newUser);
      return Response.json({ res: "User registred successfully" });
    }
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
};
