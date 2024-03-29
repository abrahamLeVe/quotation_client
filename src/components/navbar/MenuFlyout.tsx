"use client";

import Link from "next/link";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BrandsInterface } from "@/models/brand";
import { CategoriesInterface } from "@/models/category.model";
import { ScrollArea } from "../ui/scroll-area";

interface FlyoutMenuProps {
  categories?: CategoriesInterface;
  brands?: BrandsInterface;
}
export default function FlyoutMenu({ categories, brands }: FlyoutMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-inherit">
            Productos
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea>
              <ul className="grid md:w-[500px] lg:grid-cols-1 h-full max-h-96">
                {categories?.data.map(
                  (category) => (
                    <li className="row-span-3" key={category.id}>
                      <ListItem
                        urlFilter={`/filter/category?query=${category.attributes.name}`}
                        title={category.attributes.name}
                        urlImg={
                          category.attributes.image.data?.attributes.formats
                            .thumbnail.url!
                        }
                        description={category.attributes.description!}
                        className="border-b border-dashed"
                      />
                    </li>
                  )
                  // )
                )}
              </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-inherit">
            Marcas
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea>
              <ul className="grid grid-cols-2 gap-3 p-4 w-[600px] h-full max-h-96 ">
                {brands?.data.map((brand) => (
                  <li className="row-span-3" key={brand.id}>
                    <ListItem
                      urlFilter={`/filter/brand?query=${brand.attributes.name}`}
                      title={brand.attributes.name}
                      urlImg={
                        brand.attributes.image.data?.attributes.formats
                          .thumbnail.url!
                      }
                      description={brand.attributes.description!}
                    />
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle() + " bg-inherit"}
            >
              Contáctanos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps {
  className?: string;
  title: string;
  children?: React.ReactNode;
  urlImg: string;
  description?: string;
  urlFilter: string;
}

export const ListItem = ({
  children,
  className,
  title,
  description,
  urlImg,
  urlFilter,
  ...props
}: ListItemProps) => {
  return (
    <NavigationMenuLink
      asChild
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      <Link href={urlFilter} passHref>
        <div className="flex gap-2">
          <div className="aspect-1 min-w-14 min-h-14 overflow-hidden ">
            <img
              src={urlImg}
              alt={title}
              className="aspect-1 w-14 h-14 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-medium">{title}</div>
            <p className="text-xs leading-tight text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </NavigationMenuLink>
  );
};
