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
      <Button centerContent={true}>
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
      <Button centerContent={true} bgColor="bg-gray-100">
        Editar detalles
      </Button>
      <Button centerContent={true} bgColor="bg-gray-100">
        Añadir aficiones
      </Button>
      <Button centerContent={true} bgColor="bg-gray-100">
        Añadir destacados
      </Button>
    </div>
  );
};

export default UserDetailCard;
