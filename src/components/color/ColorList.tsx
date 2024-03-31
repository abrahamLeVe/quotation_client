import { useFilterContext } from "@/context/filter.context";
import { ColorsInterface } from "@/models/colors.model";
import { capitalizeFirstLetter } from "@/utilities/utils";
import { useRouter } from "next/navigation";
import { FaCircle } from "react-icons/fa6";
interface ColorListProps {
  colors?: ColorsInterface;
}

export default function ColorList({ colors }: ColorListProps) {
  const { setOpenFilter, cleanFilter } = useFilterContext();
  const router = useRouter();
  const handleClick = (name: string) => {
    cleanFilter();
    setOpenFilter(false);
    router.push(`/filter/color?query=${name}`);
  };

  return (
    <div className="flex flex-col items-start text-sm gap-2">
      {colors?.data.map((color) => (
        <button
          onClick={() => handleClick(color.attributes.name)}
          key={color.id}
          className="flex gap-2 relative hover:underline"
        >
          <FaCircle
            className="h-5 w-5 border rounded-full"
            style={{
              color: `${color?.attributes.code}`,
            }}
          />
          <p>
            {capitalizeFirstLetter(color.attributes.name)}
            {` (${color.attributes.products.data.length})`}
          </p>
        </button>
      ))}
    </div>
  );
}
