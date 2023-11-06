"use client";
import { Icons } from "@/components/Icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SigninForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    const { email, password } = formData;
    const credentials = {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard/account",
    };

    try {
      await signIn("credentials", credentials);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sesión en su cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Has olvidado tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="relative">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ingresar
              </button>
              {isPending && (
                <div className="w-full h-full absolute rounded-md inset-0 bg-gray-500 opacity-75">
                  <Icons.spinner
                    className="m-auto h-9 w-9 animate-spin"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </form>
          <div className="flex flex-row my-5 justify-end items-center gap-2">
            <p className="text-center text-sm text-gray-500 ">
              No tiene una cuenta?{" "}
            </p>
            <p className="font-semibold leading-6 text-center text-indigo-600 hover:text-indigo-500 ">
              <Link href="/register">Registrarse</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
