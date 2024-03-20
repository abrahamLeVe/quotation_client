"use client";
import { ProductInterface } from "@/models/products.model";
import { ImageGalleryIndex } from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";
import { Card, CardContent } from "../ui/card";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <>
      <Card className="h-full overflow-hidden">
        <CardContent className="flex flex-col h-full p-0">
          <div className="aspect-1 bg-gray-200 ">
            <ImageGalleryIndex product={product} />
          </div>
          <div className="flex flex-col h-full justify-between p-2 gap-2">
            <ProductDetail product={product} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
