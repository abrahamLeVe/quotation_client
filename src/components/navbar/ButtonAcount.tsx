"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function ButtonAcount() {
  const [isLogin, setIsLogin] = useState(true);
  const [openModalRoot, setOpenModalRoot] = useState(false);
  const { data: session, status } = useSession();

  const handleModalRootOpen = (
    loginState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpenModalRoot(true);
    setIsLogin(loginState);
  };

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
      <button onClick={() => handleModalRootOpen(true)} className="flow-root">
        Ingresar
      </button>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      <button onClick={() => handleModalRootOpen(false)} className="flow-root">
        Create account
      </button>
      {/* <ModalRoot
        openModalRoot={openModalRoot}
        setOpenModalRoot={setOpenModalRoot}
        child={<ModalForm isLogin={isLogin} setIsLogin={setIsLogin} />}
      ></ModalRoot> */}
    </>
  );
}
