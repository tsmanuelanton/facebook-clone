import type { User } from "@/types/user";
import { FacebookIcon } from "../utils/icons";
import {
  UsersIcon,
  VideoCameraIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const handleLogout = () => {
  const { protocol, host } = window.location;
  const baseUrl = protocol + "//" + host;
  fetch(baseUrl + "/api/logout", {
    method: "POST",
  }).then((res) => res.redirected && window.location.replace(res.url));
};

type Props = {
  currentUrl: URL;
  user: User;
};

const NavBar = ({ currentUrl, user }: Props) => {
  const [visibleUserOptions, setVisibleUserOptions] = useState(false);
  const paths = [
    {
      url: "/",
      name: "Inicio",
      icon: <HomeIcon className="w-7" />,
    },
    {
      url: "/fiends",
      name: "Amigos",
      icon: <UsersIcon className="w-7" />,
    },
    {
      url: "/videos",
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
        {paths.map((path, i) => (
          <div key={i} className="relative">
            <a
              href={path.url}
              className={`${
                path.url == currentUrl.pathname
                  ? "text-blue-600"
                  : "hover:bg-gray-200"
              } group inline-flex w-32 h-12 place-content-center rounded-md mt-1`}
            >
              {path.icon}
              <div className="invisible group-hover:visible absolute top-16 bg-gray-700 p-2 rounded-md text-white text-xs">
                {path.name}
              </div>
            </a>
            {path.url == currentUrl.pathname && (
              <div className="absolute bottom-0 h-1 w-full bg-blue-600 z-10"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-1/5 justify-end mx-2">
        <button
          onClick={() => setVisibleUserOptions(!visibleUserOptions)}
          className="peer"
        >
          <img
            className="w-10 h-10 rounded-full self-center"
            src={user.image}
            alt="Profile image"
          />
        </button>
        <span className="invisible peer-hover:visible absolute top-16 bg-gray-700 p-2 rounded-md text-white text-xs">
          Cuenta
        </span>
        {visibleUserOptions && <UserOptionsCard user={user} />}
      </div>
    </div>
  );
};

export default NavBar;

const UserOptionsCard = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col absolute top-12 z-10 gap-2 bg-white border border-gray-200 rounded-md shadow-md p-4 w-1/5">
      <div className="inline-flex gap-2 place-items-center ">
        <a
          href="/profile"
          className="flex p-2 rounded-md hover:bg-gray-200 gap-2 w-full"
        >
          <img
            src={user.image}
            alt="User profile image"
            className="w-9 h-9 rounded-full object-cover"
          />
          <p className="font-medium self-center">{user.name}</p>
        </a>
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
