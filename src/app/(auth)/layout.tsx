import NavBar from "@/components/NavBar";
import { getUser } from "@/lib/firebase/firestore/users";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedUserId = cookies().get("loggedUser")?.value;
  if (!loggedUserId) return redirect("/login");
  const user = await getUser(loggedUserId);

  return (
    <>
      <NavBar user={user} />
      {children}
    </>
  );
}
