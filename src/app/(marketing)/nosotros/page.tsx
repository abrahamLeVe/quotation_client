import React from "react";

export default function Page() {
  return (
    <div>
      <title>Nosotros</title>
      <link rel="icon" href="/favicon.ico" />

      <header className="bg-slate-200 dark:bg-gray-900 text-center py-3">
        <h1 className="text-5xl">NOSOTROS</h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <section
            id="mision"
            className="border border-gray-300 p-6 rounded-lg"
          >
            <div className="dark:bg-slate-500 py-2">
              <img
                src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1713752429/Mision_a67ec8d6d6.png"
                alt="Misión"
                className="mx-auto mb-4 max-w-[50%]"
              />
            </div>
            <h2 className="text-2xl font-bold my-4">Misión</h2>

            <p>
              Somos una empresa dedicada a la venta de productos de calidad a
              nuestra clientela, con el objetivo de brindarle la mejor atención
              posible para de esa manera poder brindarle la mejor experiencia
              posible.
            </p>
          </section>

          <section
            id="vision"
            className="border border-gray-300 p-6 rounded-lg"
          >
            <div className="dark:bg-slate-500 py-2">
              <img
                src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1713752429/vision_01893202d7.png"
                alt="Visión"
                className="mx-auto mb-4 max-w-[50%]"
              />
            </div>

            <h2 className="text-2xl font-bold my-4">Visión</h2>
            <p>
              Convertirnos en la empresa líder en atención y calidad de nuestros
              productos en la ciudad de Lima, extendiendo nuestra presencia a
              través de múltiples locales en todo el país
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
