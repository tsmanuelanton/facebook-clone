"use client";
import type { User } from "@/types/user";
import {
  UsersIcon,
  VideoCameraIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import FacebookIcon from "./FacebookIcon";
import { SessionContext } from "@/context/SessionContext";
import useComponentVisible from "@/hooks/useComponentVisible";
import LinkButton from "./LinkButton";

type Props = {
  user: User;
};

const NavBar = ({ user }: Props) => {
  const pathname = usePathname()
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const paths = [
    {
      url: "/",
      name: "Inicio",
      icon: <HomeIcon className="w-7" />,
    },
    {
      url: "",
      name: "Amigos",
      icon: <UsersIcon className="w-7" />,
    },
    {
      url: "",
      name: "Videos",
      icon: <VideoCameraIcon className="w-7" />,
    },
  ];

  return (
    <div className="flex justify-between sticky top-0 bg-white h-14 shadow-md z-50">
      <div className="w-1/5 self-center mx-4">
        <FacebookIcon className="w-7" />
      </div>
      <div className="flex w-3/5 place-content-center font-medium text-gray-500 gap-2">
        {paths.map(({ url, icon, name }) => (
          <div
            key={url}
            className={`${
              url == pathname && "text-blue-600"
            } relative group w-32 h-12 mt-1`}
          >
            <LinkButton href={url} centerContent={true}>
              {icon}
              <div className="invisible group-hover:visible absolute top-16 bg-gray-700 p-2 rounded-md text-white text-xs">
                {name}
              </div>
            </LinkButton>
            {url == pathname && (
              <div className="absolute bottom-0 h-1 w-full bg-blue-600 z-10"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-1/5 justify-end mx-2">
        <button
          onClick={() => setIsComponentVisible(!isComponentVisible)}
          className="peer"
        >
          <Image
            width={64}
            height={64}
            className="w-10 h-10 rounded-full self-center"
            src={user.image}
            alt="Profile image"
          />
        </button>
        <span className="invisible peer-hover:visible absolute top-16 bg-gray-700 p-2 rounded-md text-white text-xs">
          Cuenta
        </span>
        {isComponentVisible && (
          <div ref={ref} className="absolute top-12 z-10 w-1/5">
            <UserOptionsCard user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

const UserOptionsCard = ({ user }: { user: User }) => {
  const { logout } = useContext(SessionContext);
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push(window.location.origin + "/login");
  };

  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-md shadow-md p-4">
      <div className="inline-flex gap-2 place-items-center ">
        <Link
          href={`/profile/${user.id}`}
          className="flex p-2 rounded-md hover:bg-gray-200 gap-2 w-full"
        >
          <Image
            width={64}
            height={64}
            src={user.image}
            alt="User profile image"
            className="w-9 h-9 rounded-full object-cover"
          />
          <p className="font-medium self-center">{user.name}</p>
        </Link>
      </div>
      <div className="inline-flex gap-2 place-items-center">
        <button
          onClick={handleLogout}
          className="flex p-2 rounded-md hover:bg-gray-200 gap-2 w-full place-items-center"
        >
          <ArrowRightOnRectangleIcon className="w-8 rounded-full bg-gray-500" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
