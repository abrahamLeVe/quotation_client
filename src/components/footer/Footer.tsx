import Link from "next/link";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import dynamic from "next/dynamic";

const SuscriptionForm = dynamic(() => import("../suscription/SuscriptionForm"), {
  ssr: false,
});

export default function Footer() {
  return (
    <footer className="bg-slate-200 dark:bg-gray-900">
      <div className="md:container px-3 py-3 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-5">
          <div>
            <p className="font-semibold text-gray-800 dark:text-white text-center">Nuestra Empresa</p>
            <div className="flex flex-col items-start mt-5 space-y-2" >
            <img
                src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1713756779/office_building_4300058_5b04b3319f.png "
                alt="Mapa de ubicación"
                className="mx-auto mb-4 max-w-[25%]"
              />
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
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white text-center">Ubicación</p>
            <div className="mt-5">
            <img
                src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1713756779/location_535239_32472138fa.png"
                alt="Mapa de ubicación"
                className="mx-auto mb-4 max-w-[25%]"
              />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Calle Jose Manuel Pereyra Nro. 536 Urb. Panamericana Norte Lima - Lima - Los Olivos
              </p>

            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white"></p>
            <div className="mt-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.792513619382!2d-77.07090492536724!3d-11.988854140824358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce5a847ec743%3A0x6157879169edf82!2sJose%20Pereyra%20536%2C%20Los%20Olivos%2015301!5e0!3m2!1ses!2spe!4v1713756441437!5m2!1ses!2spe"
                width="600"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-4 text-center">
        Consorcio A&C Eléctrica SAC - Todos los derechos reservados.
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
