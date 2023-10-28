import NavBar from "@/components/NavBar";
import { getUser } from "@/lib/firebase/firestore/users";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userID = headers().get("userID")!;
  const user = await getUser(userID);

  return (
    <>
      <NavBar user={user} />
      {children}
    </>
  );
}
