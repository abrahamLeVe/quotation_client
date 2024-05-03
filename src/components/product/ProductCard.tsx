"use client";
import { ProductInterface } from "@/models/products.model";
import { ImageGalleryIndex } from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";
import { Card, CardContent, CardFooter } from "../ui/card";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <Card className="h-full ">
      <CardContent className="aspect-1 p-0 cursor-none">
        <ImageGalleryIndex product={product} />
      </CardContent>
      <CardFooter className="pt-2">
        <ProductDetail product={product} />
      </CardFooter>
    </Card>
  );
}
