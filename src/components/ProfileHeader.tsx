import type { User } from "../types/user";

const ProfileHeader = ({ user }: { user: User }) => {
  return (
    <>
      <div className="w-full flex place-content-center h-96 bg-white shadow-sm bg-gradient-to-b from-blue-950 to-white">
        <img
          src="/img/abstract-imnage.jpg"
          alt="Profile header image"
          className="w-4/6 object-cover rounded-lg"
        />
      </div>
      <div className="flex place-content-center bg-white">
        <div className="inline-flex h-32 w-4/6 px-8">
          <img
            src={user.image}
            alt="Profile header image"
            className="relative -top-16 w-44 h-44 object-cover rounded-full border-4"
          />
          <div className="flex align-bottom">
            <p className="font-bold text-3xl self-center">{user.name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
