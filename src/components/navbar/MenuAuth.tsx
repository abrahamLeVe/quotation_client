"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ButtonAcount() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return session ? (
    <>
      <Link href="/dashboard/account" className="flow-root">
        Mi cuenta
      </Link>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      <button
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        className="flow-root"
      >
        Salir
      </button>
    </>
  ) : (
    <>
      <Link href="/signin" className="flow-root">
        Ingresar
      </Link>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      <Link href="/register" className="flow-root">
        Registrarse
      </Link>
    </>
  );
}
