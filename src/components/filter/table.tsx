import { filterProducts } from "@/app/services/product.service";
import ProductPrice from "../product/ProductPrice";
import ProductRating from "../product/ProductRating";
import { truncate } from "@/utilities/utils";
import { CategoryLink } from "../category/CategoryLink";

export default async function ProductTable({ query }: { query?: string }) {
  const products = await filterProducts(query);
  console.log(products);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products?.data?.map((product) => (
              <div
                key={product.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <img
                        src={
                          product.attributes.image.data[0].attributes.formats
                            .thumbnail.url
                        }
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                      <p>{product.attributes.name}</p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <ProductRating rating={product.attributes.rating} />
                      {product.attributes.categories.data.length}
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <ProductPrice
                      price={product.attributes.price}
                      discount={product.attributes.discount}
                    />
                  </div>
                  <div className="flex justify-end gap-2">Acciones</div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Valoración
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Precio
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Categorías
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.data?.map((product) => (
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg relative"
                >
                  <td className="py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          product.attributes.image.data[0].attributes.formats
                            .thumbnail.url
                        }
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                      <p title={product.attributes.name}>
                        {truncate(product.attributes.name, 100)}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ProductRating rating={product.attributes.rating} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ProductPrice
                      price={product.attributes.price}
                      discount={product.attributes.discount}
                    />
                  </td>
                  <td className="py-3 pl-6">
                    <div className="flex flex-wrap gap-3 ">
                      <CategoryLink
                        categories={product.attributes.categories.data}
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">Acciones</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
