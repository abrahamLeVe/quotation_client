import { useCategoryContext } from "@/context/category.context";
import { useFilterContext } from "@/context/filter.context";
import { capitalizeFirstLetter } from "@/utilities/utils";
import { useRouter } from "next/navigation";

export default function ColorList() {
  const { colors } = useCategoryContext();
  const { setOpenFilter, cleanFilter } = useFilterContext();
  const router = useRouter();
  const handleClick = (name: string) => {
    cleanFilter();
    setOpenFilter(false);
    router.push(`/filter/color?query=${name}`);
  };

  return (
    <div className="flex flex-col items-start text-sm">
      {colors.map((color) => (
        <button
          onClick={() => handleClick(color.attributes.name)}
          key={color.id}
          className="relative hover:underline"
        >
          <p>
            {capitalizeFirstLetter(color.attributes.name)}
            {` (${color.attributes.products.data.length})`}
          </p>
        </button>
      ))}
    </div>
  );
}
