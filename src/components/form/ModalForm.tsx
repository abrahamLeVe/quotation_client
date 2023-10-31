"use client";
import React from "react";
import AuthForm, { AuthFormProps } from "./AuthForm";
import Link from "next/link";

export default function ModalForm({
  isLogin,
  setIsLogin,
  isPageLogin,
}: AuthFormProps) {
  const buttonText = isLogin ? "Ingresar" : "Registrarse";

  const handleToggle = () => setIsLogin!(!isLogin);

  return (
    <div className="flex max-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white overflow-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {buttonText}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
        {isLogin && (
          <p className="mt-10 text-center text-sm text-gray-500">
            No tiene cuenta?{" "}
            {!isPageLogin ? (
              <button
                onClick={handleToggle}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Registrarse
              </button>
            ) : (
              <Link href={"/register"}>Registrarse</Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
