import Button from "../components/Button";
import {
  HomeIcon,
  AcademicCapIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

const UserDetailCard = () => {
  return (
    <div className="flex flex-col gap-2 w-full p-4 rounded-md shadow-md bg-white">
      <p className="font-bold text-xl">Detalles</p>
      <Button className="w-full  font-medium bg-gray-200 hover:bg-gray-300">
        Añadir prestación
      </Button>
      <p>Trabaja en Facebook</p>
      <p className="inline-flex gap-2">
        <AcademicCapIcon className="w-5" /> Estudió en IES La Ería
      </p>
      <p className="inline-flex gap-2">
        <AcademicCapIcon className="w-5" /> Estudió en la Universidad de Oviedo
      </p>
      <p className="inline-flex gap-2">
        <HomeIcon className="w-5" /> Vive en Oviedo
      </p>
      <p className="inline-flex gap-2">
        <MapPinIcon className="w-5" /> De Etiopía
      </p>
      <Button className="w-full  font-medium bg-gray-200">
        Editar detalles
      </Button>
      <Button className="w-full  font-medium bg-gray-200">
        Añadir aficiciones
      </Button>
      <Button className="w-full  font-medium bg-gray-200">
        Añadir destacados
      </Button>
    </div>
  );
};

export default UserDetailCard;
