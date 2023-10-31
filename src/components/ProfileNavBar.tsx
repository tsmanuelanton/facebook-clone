import LinkButton from "./LinkButton";

const ProfileNavBar = () => {
  const paths = [
    {
      url: "",
      name: "Publicaciones",
    },
    {
      url: "",
      name: "Información",
    },
    {
      url: "",
      name: "Amigos",
    },
    {
      url: "",
      name: "Videos",
    },
    {
      url: "",
      name: "Visitas",
    },
  ];

  return (
    <div className="flex place-content-center bg-white shadow-sm sticky top-14 z-30">
      <div className="w-4/6 px-8 border-t-2">
        <div className="flex font-medium text-gray-500">
          {paths.map((path, i) => (
            <div
              key={i}
              className={`${
                path.name == "Publicaciones" && "text-blue-600"
              } relative w-32 h-12 m-1`}
            >
              <LinkButton href={path.url} centerContent={true}>
                <p className="self-center">{path.name}</p>
              </LinkButton>
              {path.name == "Publicaciones" && (
                <div className="absolute bottom-0 h-1 w-full bg-blue-600 z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfileNavBar;
