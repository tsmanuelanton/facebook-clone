import { FacebookIcon } from "../utils/icons";
import {
  UsersIcon,
  VideoCameraIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const NavBar = ({ currentUrl }: { currentUrl: URL }) => {
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
        <button className="peer">
          <img
            className="w-10 h-10 rounded-full self-center"
            src="/img/minions.jpg"
            alt="Profile image"
          />
        </button>
        <span className="invisible peer-hover:visible absolute top-16 bg-gray-700 p-2 rounded-md text-white text-xs">
          Cuenta
        </span>
      </div>
    </div>
  );
};

export default NavBar;
