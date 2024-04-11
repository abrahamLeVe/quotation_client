export async function readSitemapFromURL(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error al leer el sitemap desde la URL ${url}: ${response.status} ${response.statusText}`
      );
    }
    const sitemapData = await response.text();
    return sitemapData;
  } catch (error) {
    console.error(`Error al leer el sitemap desde la URL ${url}:`, error);
    throw error;
  }
}
