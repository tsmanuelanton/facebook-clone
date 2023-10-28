"use client"
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { SessionContext } from "@/context/SessionContext";

const LeftNavBar = () => {
  const {loggedUser} = useContext(SessionContext)
  return (
    <div className="sticky top-20 w-full">
      <Link  href={`/profile/${loggedUser?.id}`}  className="flex p-2 rounded-md hover:bg-gray-200 gap-2">
        <Image width={100} height={100} src={loggedUser?.image || ""} alt="User profile image" className="w-9 h-9 rounded-full object-cover" />
        <p className="font-medium self-center">{loggedUser?.name}</p>
      </Link >
    </div>
  );
};

export default LeftNavBar;
