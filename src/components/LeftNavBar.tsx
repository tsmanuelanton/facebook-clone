import type { User } from "../types/user";

const LeftNavBar = ({ user }: { user: User }) => {
  return (
    <div className="sticky top-20 w-full">
      <a href="/profile"  className="flex p-2 rounded-md hover:bg-gray-200 gap-2">
        <img src={user.image} alt="User profile image" className="w-9 h-9 rounded-full object-cover" />
        <p className="font-medium self-center">{user.name}</p>
      </a>
    </div>
  );
};

export default LeftNavBar;
