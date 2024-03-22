export default function LoadingCart() {
  return (
    <div className="px-4  sm:px-6 w-full min-h-screen">
      <div className="flex flex-col lg:flex-row mt-8 relative gap-4 ">
        {/* Cart Products Placeholder */}
        <div className="animate-pulse bg-gray-200 rounded-lg p-4 flex-1">
          {/* Placeholder for cart products */}
          <div className="h-10 w-full mb-4 bg-gray-300"></div>
          <div className="h-10 w-full mb-4 bg-gray-300"></div>
          <div className="h-10 w-full mb-4 bg-gray-300"></div>
          {/* Add more placeholders as needed */}
        </div>
        {/* Summary Placeholder */}
        <div className="sticky top-20 h-full my-8 lg:max-w-md w-full">
          <table className="border-collapse w-full text-sm shadow-sm">
            <thead>
              <tr>
                <th className="border-b p-4 pt-0 pb-3 text-left">
                  Resumen del pedido
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder for summary details */}
              <tr>
                <td className="border-b"></td>
              </tr>
              <tr>
                <td className="flex flex-col gap-3 border-b  text-sm p-4 animate-pulse">
                  <div className="flex justify-between items-center gap-2">
                    {/* Placeholder for summary details */}
                    <div className="h-4 w-1/2 bg-gray-300"></div>
                    <div className="h-4 w-1/4 bg-gray-300"></div>
                  </div>
                  {/* Add more placeholders as needed */}
                </td>
              </tr>
              <tr>
                <td className="border-b text-lg font-semibold p-4 animate-pulse">
                  <div className="flex justify-end items-center">
                    {/* Placeholder for quotation check */}
                    <div className="h-10 w-1/4 bg-gray-300"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
