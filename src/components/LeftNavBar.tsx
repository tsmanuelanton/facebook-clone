"use client"
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { SessionContext } from "@/context/SessionContext";
import LinkButton from "./LinkButton";

const LeftNavBar = () => {
  const {loggedUser} = useContext(SessionContext)
  return (
    <div className="sticky top-20 w-full">
      <LinkButton href={`/profile/${loggedUser?.id}`}>
        <Image
          width={100}
          height={100}
          src={loggedUser?.image || ""}
          alt="User profile image"
          className="w-9 h-9 rounded-full object-cover"
        />
        <p className="font-medium self-center">{loggedUser?.name}</p>
      </LinkButton>
    </div>
  );
};

export default LeftNavBar;
