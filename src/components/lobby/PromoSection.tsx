"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function PromoSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-6xl dark:text-gray-400">
              Los mejores productos los tenemos nosotros
            </h1>

            <div className="mt-4 ">
              <Button
                className="relative max-w-[250px] w-full "
                variant={"outline"}
              >
                Contáctenos
                <Link href={"/contact"} className="absolute inset-0"></Link>
              </Button>
            </div>
          </div>
          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-44 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711820913/BUSHING_INSERT_ec63c1677c.webp"
                          alt="ecommerce-images1"
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711750613/AISLADOR_1_713607f1b3.webp"
                          alt="ecommerce-images2"
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711751906/AISLADOR_5_f5df77f0af.webp"
                          alt="ecommerce-images3"
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711755741/Conmutador_Circular_Monofasico_5dab24118b.webp"
                          alt="ecommerce-images4"
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711764761/FIBRA_DE_VIDRIO_SPAGUETI_AISLANTE_1_820de94c57.webp"
                          alt="ecommerce-images6"
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711232943/silicagel_66f7bfd707.webp"
                          alt="ecommerce-images7"
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
