"use client";
import Link from "next/link";
import SuscriptionForm from "../suscription/SuscriptionForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Footer() {
  return (
    <footer className="bg-slate-200 dark:bg-gray-900 pt-14">
      <div className="md:container px-3 py-3 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 ">
          <div className="flex flex-col justify-between gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col items-start mt-5 space-y-2">
                <span className="font-semibold text-gray-800 dark:text-white text-left">
                  Nuestra Empresa
                </span>
                {nosotros.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="dark:text-white w-32 p-5 dark:bg-slate-400">
                <img
                  src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1713756779/office_building_4300058_5b04b3319f.png"
                  alt="Mapa de ubicación"
                  className="w-full "
                />
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Suscríbase</CardTitle>
              </CardHeader>

              <CardContent>
                <SuscriptionForm />
              </CardContent>

              <CardFooter>
                Entérese de lo último, gane descuentos y más.
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.792513619382!2d-77.07090492536724!3d-11.988854140824358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce5a847ec743%3A0x6157879169edf82!2sJose%20Pereyra%20536%2C%20Los%20Olivos%2015301!5e0!3m2!1ses!2spe!4v1713756441437!5m2!1ses!2spe"
                height="280"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full"
              ></iframe>
            </CardContent>
            <CardFooter>
              Calle Jose Manuel Pereyra Nro. 536 Urb. Panamericana Norte Lima -
              Lima - Los Olivos
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-4 text-center text-sm mt-8">
        Consorcio A&C Eléctrica S.A.C - 2024 - Lima Perú
      </div>
    </footer>
  );
}

const nosotros = [
  {
    id: 1,
    label: "Nosotros",
    link: "/nosotros",
  },
  {
    id: 2,
    label: "Contáctanos",
    link: "/contact",
  },
];
