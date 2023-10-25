import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const POST = async () => {
  cookies().delete("loggedUser");
  return redirect("/login");
};
