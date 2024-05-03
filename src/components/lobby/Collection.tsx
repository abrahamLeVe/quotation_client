"use client";
import { CategoriesInterface } from "@/models/category.model";
import { shuffleArray } from "@/utilities/utils";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CollectionProps {
  categories: CategoriesInterface;
}

export default function Collection({ categories }: CollectionProps) {
  const shuffledCategories = shuffleArray([...categories.data]).slice(0, 6);
  return (
    <Card className="w-full bg-slate-200 dark:bg-gray-900">
      <CardHeader>
        <h2 className="text-2xl font-bold ">Principales Categorias</h2>
      </CardHeader>
      <CardContent className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {shuffledCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden  relative">
            <CardContent className="p-0 w-full aspect-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      src={category.attributes.image.data.attributes.url}
                      alt={category.attributes.name}
                      className="h-full w-full aspect-1"
                      loading="lazy"
                    />
                    <Link
                      prefetch={true}
                      href={`/filter/category?query=${category.attributes.name}`}
                      className="absolute inset-0"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-current">
                    <p className="text-white dark:text-black">
                      Click para ver {category.attributes.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>

            <CardFooter className="flex justify-between items-center p-2">
              <h3 className="dark:text-gray-200">{category.attributes.name}</h3>
              <p className="text-base font-semibold text-gray-900 dark:text-gray-400">
                {category.attributes.description}
              </p>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
