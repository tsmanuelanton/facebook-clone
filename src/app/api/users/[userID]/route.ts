import { getUser} from "@/lib/firebase/firestore/users";
import { NextRequest } from "next/server";

export const GET = async (req : NextRequest,{params}: {params: {userID: string}}) => {
  const user = await getUser(params.userID);
  if (user == undefined) {
    return new Response(null, {
      status: 404,
    });
  }
  return Response.json(user);
};
