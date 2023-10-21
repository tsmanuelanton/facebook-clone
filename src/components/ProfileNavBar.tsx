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
          {paths.map((path) => (
            <div className="relative">
              <a
                href={path.url}
                className={`${
                  path.name == "Publicaciones"
                    ? "text-blue-600"
                    : "hover:bg-gray-200"
                } group flex w-32 h-12 place-content-center rounded-md m-1`}
              >
                <p className="self-center">{path.name}</p>
              </a>
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
