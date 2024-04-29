import { CLIENT_URL } from "@/utilities/urls";
import { readSitemapFromURL } from "./downloadSitemap";

interface ProductLinkAndImage {
  link: string;
  imageUrl: string;
}

interface Cache {
  lastFetch: number;
  cacheDuration: number;
  data: ProductLinkAndImage[] | null;
}

const cache: Cache = {
  lastFetch: 0,
  cacheDuration: 1000 * 60 * 60, // Cache dura 1 hora
  data: null,
};

const companyData = {
  nombre: "Consorcio A&C eléctrica S.A.C",
  celular: `+${process.env.NEXT_PUBLIC_CLIENT_PHONE}`,
  email: `[Aquí](mailto:${process.env.NEXT_PUBLIC_CLIENT_EMAIL})`,
  rubro: "Importación y venta de materiales eléctricos para transformadores",
  horario_atención:
    "Nuestro horario de atención es de Lunes a Sábado de 8:00 a 12:00 y de 14:00 a 19:00.",
  direccion:
    "C. José Manuel Pereyra 536 Urb.: Panamericana Norte Lima, Lima - Los Olivos",
  ruc: `${process.env.NEXT_PUBLIC_CLIENT_RUC}`,
};

async function fetchSitemapData(): Promise<ProductLinkAndImage[]> {
  const now = Date.now();
  if (!cache.data || now - cache.lastFetch > cache.cacheDuration) {
    const sitemapURL = `${CLIENT_URL}/sitemap.xml`;
    const sitemapData = await readSitemapFromURL(sitemapURL);
    const regex = /<loc>(.*?) - imagen:(.*?)<\/loc>/g;
    const matches = Array.from(sitemapData.matchAll(regex));
    const linksAndImages = matches.map((match) => ({
      link: match[1],
      imageUrl: match[2],
    }));

    cache.data = linksAndImages;
    cache.lastFetch = now;
  }
  return cache.data!;
}

function generateMarkdown(linksAndImages: ProductLinkAndImage[]): string {
  const markdown = linksAndImages
    .map(
      (item) => `[Aquí](${item.link})\n![Imagen del producto](${item.imageUrl})`
    )
    .join("\n\n");
  return markdown;
}

export async function generateChatbotPrompt(): Promise<string> {
  const linksAndImages = await fetchSitemapData();
  const markdownLinksImages = generateMarkdown(linksAndImages);

  const additionalInfo = `En nuestra tienda mostramos materiales eléctricos para transformadores, como aisladores de porcelana, termómetros, interruptores termomagnéticos, niveles de aceite, entre otros. Puedes encontrar todos nuestros productos en:
   [Aquí]${linksAndImages}
   [imagen](<img
            src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1711234059/thumbnail_Cinta_kapton_1_1327d12837.webp"
            alt="nombre del producto"
            class="mi class name personalizado"
            loading="lazy"
          />), me encanta mostrar siempre imagen si voy a mostrar hasta 3, si quiere ver mas [Aquí]${markdownLinksImages} galería o catálogo`;

  const companyInfo = `
    Nombre: ${companyData.nombre}
    Celular: ${companyData.celular}
    Email: ${companyData.email}
    Rubro: ${companyData.rubro}
    Horaio de atención: ${companyData.horario_atención}
    Dirección: ${companyData.direccion}
    RUC: ${companyData.ruc}
  `;

  return `
    Eres un útil chatbot de atención al cliente integrado este sitio web: ${CLIENT_URL}.
    Datos de la empresa:${companyInfo}
    También eres un eficiente buscador de productos.
    Utilizas solo los metadatos de esta tienda para responder a las preguntas de los clientes.
    
    ${additionalInfo}
    Prohibido listar y responder preguntas que requieran dar conceptos largos. Tu misión es brindar enlaces de productos, categorías, marcas, con sus imágenes. Existentes en la tienda.
    Solo brindas enlaces de los productos disponibles en el sitemap de la tienda.
    Aparte de los enlaces, utilizas texto normal.
    Rechazas cualquier respuesta que no tenga que ver con esta tienda web de cotización de materiales eléctricos para transformadores o su contenido.
    Por favor, mantén una comunicación respetuosa y adecuada en todo momento.
    Estás diseñado para proporcionar información sobre la tienda y sus productos. Respondes preguntas o problemas relacionados con la tienda de cotización de materiales eléctricos para transformadores y estás encantado de ayudar.
  `;
}
