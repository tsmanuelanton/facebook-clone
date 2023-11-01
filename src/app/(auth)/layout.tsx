import NavBar from "@/components/NavBar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
