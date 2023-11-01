import { Cog8ToothIcon } from "@heroicons/react/24/solid";

type Props = {
  title: string;
  children: React.ReactNode;
};

const LSideBarCard = ({ title, children }: Props) => {
  return (
    <div className="bg-white w-1/5 h-screen shadow-lg pt-4 px-2 space-y-1">
      <div className="flex justify-between place-items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <Cog8ToothIcon className="w-9 bg-gray-300 rounded-full p-1" />
      </div>
      {children}
    </div>
  );
};

export default LSideBarCard;
