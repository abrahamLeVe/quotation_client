"use client";
import Link from "next/link";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "../Icons";
import { z } from "zod";
import { registerNewsletter } from "@/app/services/auth.service";

export default function Footer() {
  const [errorFetch, setErrorFetch] = useState();
  const [isPending, setIsPending] = useState(false);

  type Inputs = z.infer<typeof emailSchema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: Inputs) {
    setIsPending(true);

    try {
      const res = await registerNewsletter({data});
      if(!res?.data){
        
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setIsPending(false);
    }
  }
  const socialLinks = [
    {
      id: 1,
      icon: <BsFacebook className={"w-6 h-6"} />,
      label: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      id: 2,
      icon: <FaSquareXTwitter className={"w-6 h-6"} />,
      label: "Twitter",
      link: "https://twitter.com/",
    },
    {
      id: 3,
      icon: <AiFillYoutube className={"w-6 h-6"} />,
      label: "YouTube",
      link: "https://www.youtube.com/",
    },
    {
      id: 4,
      icon: <AiFillInstagram className={"w-6 h-6"} />,
      label: "Instagram",
      link: "https://www.instagram.com/",
    },
  ];

  const nosotros = [
    {
      id: 1,
      label: "Nosotros",
      link: "/nosotros",
    },
    {
      id: 2,
      label: "Políticas de privacidad",
      link: "/politicas-de-privacidad",
    },
    {
      id: 3,
      label: "Políticas de cookies",
      link: "/politicas-de-cookies",
    },
  ];

  const servicios = [
    {
      id: 1,
      label: "Política de envíos",
      link: "/nosotros",
    },
    {
      id: 2,
      label: "Política de devoluciones",
      link: "/politicas-de-privacidad",
    },
    {
      id: 3,
      label: "Preguntas frecuentes",
      link: "/politicas-de-cookies",
    },
    {
      id: 4,
      label: "Guía de tallas",
      link: "/politicas-de-cookies",
    },
  ];

  const contacto = [
    {
      id: 1,
      label: "Agenda tu cita",
      link: "/nosotros",
    },
    {
      id: 2,
      label: "Tiendas / Ubicaciones",
      link: "/politicas-de-privacidad",
    },
    {
      id: 3,
      label: "Email / Contacto",
      link: "/politicas-de-cookies",
    },
  ];
  return (
    <footer className="bg-slate-200 dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-5">
          <div className="sm:col-span-2 sm:pr-5">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
              Suscríbase a nuestro boletín para recibir actualizaciones.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3  gap-2">
              <Form {...form}>
                <form
                  className="grid gap-4"
                  onSubmit={(...args) =>
                    void form.handleSubmit(onSubmit)(...args)
                  }
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="rodneymullen180@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button disabled={isPending}>
                    {isPending && (
                      <Icons.spinner
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Suscribirse
                    <span className="sr-only">Suscribirse</span>
                  </Button>
                  {errorFetch ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        El correo electrónico y/o la contraseña son incorrectos.
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </form>
              </Form>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              DSStore
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              {servicios ? (
                <>
                  {servicios.map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              ) : null}
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Contáctanos
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              {contacto ? (
                <>
                  {contacto.map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              ) : null}
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">Sobre</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              {nosotros ? (
                <>
                  {nosotros.map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

        <div className="flex items-center justify-between">
          <span>
            <Link href="/">DSStore</Link>
          </span>
          <div className="flex -mx-2">
            {socialLinks
              ? socialLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    aria-label={item.label}
                    target="_blank"
                  >
                    <>{item.icon}</>
                  </a>
                ))
              : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
