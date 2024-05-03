"use client";
import { BrandInterface } from "@/models/brand";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { BsEye } from "react-icons/bs";

export default function BrandCard({ brand }: { brand?: BrandInterface }) {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="flex flex-col p-0">
        <img
          src={brand?.attributes.image.data?.attributes.url}
          alt={brand?.attributes.name}
          className="aspect-square w-full object-cover object-center"
          loading="lazy"
        />
        <Button
          className={
            "absolute top-0 right-0 bg-white/20 bg-opacity-80 backdrop-filter backdrop-blur-md text-gray-900 "
          }
          title="Ver productos"
        >
          <BsEye className="h-[1.2rem] w-[1.2rem]" />
          Explorar marca
          <Link
            prefetch={true}
            href={`/filter/brand?query=${brand?.attributes.name}`}
            className="absolute inset-0"
          ></Link>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col h-full p-2 gap-1">
        <div className="text-lg font-medium">{brand?.attributes.name}</div>
        <p className="text-sm leading-tight text-muted-foreground">
          {brand?.attributes.description}
        </p>
      </CardFooter>
    </Card>
  );
}
