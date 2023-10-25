import Link from "next/link";
import { useState, type FormEvent } from "react";

const LoginCard = () => {
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [failed, setFailed] = useState(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { protocol, host } = window.location;
    const baseUrl = protocol + "//" + host;
    const res = await fetch(`${baseUrl}/api/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
      }),
    });
    if (res.ok)
      import("astro:transitions/client").then(({ navigate }) => navigate("/"));
    else setFailed(true);
  };

  return (
    <div className="flex flex-col w-1/3 rounded-md  bg-white shadow-lg p-4 text-lg divide-y-2 space-y-4">
      <form onSubmit={(e) => handleSignUp(e)} className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-blue-600">facebook</h1>
        <h2 className="">Es rápido y fácil</h2>
        <label title="name">
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required={true}
            className="w-full border rounded-md p-3"
            placeholder="Nombre"
          />
        </label>
        <label title="surname">
          <input
            type="text"
            value={surname}
            onChange={({ target }) => setSurname(target.value)}
            required={true}
            className="w-full border rounded-md p-3"
            placeholder="Apellido"
          />
        </label>
        <label title="Email">
          <input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required={true}
            className="w-full border rounded-md p-3"
            placeholder="Correo electrónico"
          />
        </label>

        <label title="Contraseña">
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required={true}
            className="w-full border rounded-md p-3"
            placeholder="Contraseña"
          />
        </label>
        {failed && (
          <p className="text-sm text-red-500">
            Ya existe una cuenta para {email}
          </p>
        )}

        <button className="w-full p-3 border rounded-md bg-green-500 text-white font-medium hover:bg-green-600">
          Registrarte
        </button>
      </form>
      <div className="flex place-content-center pt-4">
        <p>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-blue-600">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginCard;
