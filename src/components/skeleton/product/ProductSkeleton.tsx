"use client";
export default function ProductGallerySkeleton() {
  return (
    <div className="flex flex-col w-full lg:flex-row gap-5 p-6">
      {/* galery image*/}
      <div className="flex flex-row  lg:w-[50%]">
        <div className="flex flex-col gap-1 mx-[4px]">
          <div className="w-[75px] h-[68.81px] md:w-[92px] md:h-[84.42px] m-[4px] bg-gray-200"></div>
          <div className="w-[75px] h-[68.81px] md:w-[92px] md:h-[84.42px] m-[4px] bg-gray-200"></div>
        </div>
        <div className="ml-[2px]">
          <img
            src="/skeletonProduct.png"
            alt="skeleton"
            className="w-full"
            loading="lazy"
          />
        </div>
      </div>

      {/* product details */}
      <div className="flex gap-4 flex-col lg:w-[50%]">
        <div className="flex flex-col gap-3 ">
          {/* name */}
          <div className="h-12 w-full bg-gray-200 mb-2"></div>
          {/* rating */}
          <div className="flex gap-1">
            <div className="h-4 w-4 bg-gray-200 mb-2"></div>
            <div className="h-4 w-4 bg-gray-200 mb-2"></div>
            <div className="h-4 w-4 bg-gray-200 mb-2"></div>
            <div className="h-4 w-4 bg-gray-200 mb-2"></div>
            <div className="h-4 w-4 bg-gray-200 mb-2"></div>
          </div>
          {/* price */}
          <div className="flex flex-row gap-5">
            <div className="h-6 w-[65px] bg-gray-200"></div>
          </div>

          <ul className="h-[48px] ">
            {/* stock */}
            <li className="flex gap-2 my-[6px]">
              <div className="h-[18px] w-[118px] bg-gray-200"></div>
              <div className="h-[18px] w-[50px] bg-gray-200"></div>
            </li>
            {/* categories */}
            <li className="flex gap-2 my-[6px]">
              <div className="h-[18px] w-[90px] bg-gray-200"></div>
              <div className="h-[18px] w-1/4 bg-gray-200"></div>
            </li>
          </ul>
        </div>
        {/* button */}
        <div className="flex flex-wrap justify-end gap-2">
          <div className="h-10 w-[110px] bg-gray-200"></div>
        </div>
        {/* description */}
        <div>
          <div className="h-[56px] w-full bg-gray-200 mb-2"></div>
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Imagen y Nombre*/}
      <td className="relative overflow-hidden w-[61%] py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-100"></div>
          <div className="h-6 w-[90%] rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Valoración */}
      <td className="px-3 py-3">
        <div className="h-6 w-24 rounded bg-gray-100"></div>
      </td>
      {/* Precio */}
      <td className=" px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Categorías */}
      <td className=" px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className=" py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function ProductsMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function ProductsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <ProductsMobileSkeleton />
            <ProductsMobileSkeleton />
            <ProductsMobileSkeleton />
            <ProductsMobileSkeleton />
            <ProductsMobileSkeleton />
            <ProductsMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  valoración
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Precio
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Categorías
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
