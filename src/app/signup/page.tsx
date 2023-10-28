import SignUpCard from "@/components/SignUpCard";

export default function SignUp() {
  return (
    <div className="flex place-content-center p-4 h-screen">
      <div className="w-1/5"></div>
      <main className="flex place-content-center w-3/5 items-center mb-60">
        <SignUpCard />
      </main>
      <div className="w-1/5"></div>
    </div>
  );
}
