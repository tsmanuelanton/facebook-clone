const profile = {
  image:
    "https://scontent.fbio3-2.fna.fbcdn.net/v/t1.18169-9/10687094_1484436165140607_3166086851861933286_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=be3454&_nc_ohc=Aff6_7PqigcAX-97lGn&_nc_ht=scontent.fbio3-2.fna&oh=00_AfCEkN5U0PekM__u-yO_baFp6Mt6M6W77CFICqc_YrOheA&oe=654EAEAD",
  name: "Manuel",
};

const NewPost = () => {
  return (
    <div className="rounded-md shadow-md w-2/3 p-3 divide-y-2 space-y-4  ">
      <div className="flex space-x-2">
        <img
          className="w-12 rounded-full"
          src={profile.image}
          alt="Profile image"
        />
        <input
          className="rounded-3xl bg-gray-200 w-full p-2"
          type="text"
          placeholder={`¿Que estás pensando, ${profile.name}?`}
        />
      </div>
      <div className="flex justify-between pt-2 font-medium text-gray-500">
        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200">
          <img className="mr-2" src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" />
          Video en directo
        </button>

        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200">
          <img className="mr-2" src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" />
          Foto/video
        </button>

        <button className="inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200">
          <img className="mr-2" src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png" />
          Sentimiento/actividad
        </button>
      </div>
    </div>
  );
};

export default NewPost;
