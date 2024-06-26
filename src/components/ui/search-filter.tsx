"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  placeholder,
  title = "Buscar",
}: {
  placeholder: string;
  title?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term.replace(/\s{2,}/g, " "));
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full md:w-1/3">
      <label
        htmlFor="query"
        className="flex text-lg font-semibold tracking-tight pb-3 gap-2"
      >
        {title}{" "}
        <p className="font-light">
          {searchParams.get("query")?.toString() || ""}
        </p>
      </label>

      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <BsSearch className="h-3 w-3 text-gray-600" aria-hidden="true" />
        </div>
        <input
          onChange={(event) => handleSearch(event.target.value)}
          placeholder={placeholder}
          maxLength={50}
          name="query"
          id="query"
          className="block w-full rounded-md border-0 py-2 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
        />
      </div>
    </div>
  );
}
