const posts = [
  {
    id: 1,
    title: "Escelente servicio",
    href: "#",
    description:
      "Lo que realmente me impresionó fue la precisión de los precios y la rapidez con la que recibí mi cotización. En cuestión de minutos, ya tenía una estimación detallada que se ajustaba perfectamente a mi presupuesto.",
    date: "10 de abril del 2024",
    datetime: "2020-03-16",
    category: { title: "Accesorios para trasformadores", href: "#" },
    author: {
      name: "Julio Sotelo Carpio",
      /* role: "Co-Founder / CTO", */
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },

  {
    id: 2,
    title: "Buenos productos al precio justo",
    href: "#",
    description:
      "Me siento satisfecho por la calidad de los accesorios para transformadores que encontré en esta página. No solo son excelentes en rendimiento, sino que los precios también son muy razonables.",
    date: "01 de marzo del 2024",
    datetime: "2020-03-16",
    category: { title: "Papel aislante", href: "#" },
    author: {
      name: "Fernando Castro Zumaeta",
      /* role: "Co-Founder / CTO", */
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function Testimonials() {
  return (
    <div className="w-full py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Testimonios
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-900 dark:text-gray-400">
            Descubre lo que nuestros clientes tienen que decir sobre su
            experiencia utilizando nuestros servicios y productos. Aquí
            encontrarás testimonios reales de personas que han confiado en
            nosotros para satisfacer sus necesidades en la industria de los
            transformadores y accesorios eléctricos.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time
                  dateTime={post.datetime}
                  className="text-gray-500 dark:text-gray-400"
                >
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-200">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-5 text-sm leading-6 text-gray-600 dark:text-gray-500">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                {/* <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                  loading="lazy"
                />
  */}{" "}
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900 dark:text-gray-400">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  {/* <p className="text-gray-600">{post.author.role}</p> */}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
