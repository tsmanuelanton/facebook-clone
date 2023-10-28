import { cookies } from "next/headers";

export const POST = async () => {
  cookies().delete("jwt");
  return Response.json({res: "Log out successfully"})
};
