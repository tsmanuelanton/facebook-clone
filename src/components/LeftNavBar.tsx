import Image from "next/image";
import type { User } from "../types/user";
import Link from "next/link";

const LeftNavBar = ({ user }: { user: User }) => {
  return (
    <div className="sticky top-20 w-full">
      <Link  href={`/profile/${user.id}`}  className="flex p-2 rounded-md hover:bg-gray-200 gap-2">
        <Image width={100} height={100} src={user.image} alt="User profile image" className="w-9 h-9 rounded-full object-cover" />
        <p className="font-medium self-center">{user.name}</p>
      </Link >
    </div>
  );
};

export default LeftNavBar;
