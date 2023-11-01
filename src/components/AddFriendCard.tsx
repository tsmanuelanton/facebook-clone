import { User } from "@/types/user";
import Image from "next/image";

type Props = {
  user: User;
};

const AddFriendCard = ({ user }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="h-56 relative">
        <a href={`/profile/${user.id}`}>
          <Image
            src={user.image}
            fill={true}
            title={`${user.name}`}
            alt={`Imagen de perfil de ${user.name}`}
            className="rounded-t-lg"
          />
        </a>
      </div>
      <div className="p-3 font-medium">
          <a href={`/profile/${user.id}`} className="hover:underline">
            {user.name}
          </a>
        <div className="flex flex-col gap-2 mt-6">
          <button className="p-1 bg-blue-500 text-white rounded-md">
            Agregar amigo
          </button>
          <button className="p-1 bg-gray-200 rounded-md">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default AddFriendCard;
