import NavBar from "@/components/NavBar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  if (!headers().get("userID")) redirect("/login")

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
