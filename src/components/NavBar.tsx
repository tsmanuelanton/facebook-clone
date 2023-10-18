import { FacebookIcon } from "../utils/icons";
import { HomeIcon } from "@heroicons/react/20/solid";
import { UsersIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  return (
    <div className="flex justify-between sticky top-0 bg-white h-14 shadow-md z-50">
      <div className="w-1/5 self-center mx-4">
        <FacebookIcon className="w-7" />
      </div>
      <div className="flex w-3/5 place-content-center font-medium text-gray-500 gap-2 mt-2">
        <a href="/" className="group inline-flex w-32 place-content-center text-blue-600  border-b-4 border-blue-600">
          <HomeIcon className="w-7" />
          <span className="invisible group-hover:visible absolute top-16 bg-gray-700 p-2 rounded-md text-white text-xs">
            Inicio
          </span>
        </a>

        <a className="group inline-flex w-32 place-content-center rounded-md border-b-4 border-white hover:bg-gray-200">
          <UsersIcon className="w-7" />
          <span className="invisible group-hover:visible absolute top-16 bg-gray-700 p-2 rounded-md text-white text-xs">
            Amigos
          </span>
        </a>
        <a className="group inline-flex w-32 place-content-center rounded-md border-b-4 border-white hover:bg-gray-200">
          <VideoCameraIcon className="w-7" />
          <span className="invisible group-hover:visible absolute top-16 bg-gray-700 p-2 rounded-md text-white text-xs">
            Vídeo
          </span>
        </a>
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
