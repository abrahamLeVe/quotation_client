"use client";
import { Card, CardContent } from "../ui/card";

const callouts = [
  {
    name: "Accesorios para transformador",
    description: "",
    imageSrc:
      "https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711525763/ACCESORIOS_1abe8b25ef.webp",
    imageAlt:
      "Accesorios para transformador",
    href: "#",
  },
  {
    name: "Materiales eléctricos",
    description: "",
    imageSrc:
      "https://res.cloudinary.com/dmpmxzyrg/image/upload/v1712642954/materiales_electricos_8b70667aed.webp",
    imageAlt:
      "Materiales eléctricos",
    href: "#",
  },
  {
    name: "Insumos para transformador",
    description: "",
    imageSrc:
      "https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711526434/INSUMOS_b1b0efb210.webp",
    imageAlt: "Insumos para transformador",
    href: "#",
  },
  {
    name: "Aisladores",
    description: "",
    imageSrc:
      "https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711508342/AISLADORES_2bd697181e.webp",
    imageAlt: "Aisladores",
    href: "#",
  },
  {
    name: "Llaves térmicas",
    description: "",
    imageSrc:
      "https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711528125/LLAVE_TERMICA_2f160de994.webp",
    imageAlt: "Llaves térmicas  ",
    href: "#",
  },
  {
    name: "Termómetros",
    description: "",
    imageSrc:
      "https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711509227/TERMOMETROS_c4bbcef8f8.webp",
    imageAlt: "Termómetros",
    href: "#",
  },

];

export default function Collection() {
  return (
    <Card className="w-full bg-slate-200 dark:bg-gray-900">
      <CardContent className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-8 sm:py-16 lg:max-w-none lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Principales Categorias
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <Card className="relative h-80 w-full overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </Card>
                <h3 className="mt-6 text-sm text-gray-500 dark:text-gray-200">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900 dark:text-gray-400">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
