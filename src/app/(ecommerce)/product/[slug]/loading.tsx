import Image from "next/image";
import image from "../../../../../public/skeletonProduct.webp";

export default function loading() {
  return (
    <div className="flex flex-col w-full lg:flex-row gap-5 p-6">
      {/* galery image*/}
      <div className="flex flex-row  lg:w-[50%]">
        <div className="flex flex-col gap-1 mx-[4px]">
          <div className="w-[75px] h-[68.81px] md:w-[92px] md:h-[84.42px] m-[4px] bg-gray-200"></div>
          <div className="w-[75px] h-[68.81px] md:w-[92px] md:h-[84.42px] m-[4px] bg-gray-200"></div>
        </div>
        <div className="ml-[2px]">
          <Image src={image} alt="skeleton" priority={false} />
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
