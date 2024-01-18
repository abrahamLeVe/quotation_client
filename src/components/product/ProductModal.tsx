"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductInterface } from "@/models/products.model";
import { useRouter } from "next/navigation";
import { BsEye } from "react-icons/bs";
import ImageGalleryModal from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface ProductModalProps {
  product: ProductInterface;
  isCart?: boolean;
}

export default function ProductModal({
  product,
  isCart = false,
}: ProductModalProps) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            isCart
              ? "absolute bg-white/20 bg-opacity-80 backdrop-filter backdrop-blur-md text-gray-900 "
              : ""
          }
          title="Ver mas detalles"
        >
          <BsEye className="h-[1.2rem] w-[1.2rem]" />
          {isCart ? "" : "Ver mas detalles"}
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-6xl h-full max-h-[600px]">
        <ScrollArea>
          <div className="flex flex-col lg:flex-row gap-5">
            <div>
              <ImageGalleryModal
                attributes={product.attributes}
                id={product.id}
              />
            </div>
            <div className="flex gap-3 flex-col lg:w-[45%]">
              <div className="flex flex-col gap-2">
                {/* Details */}
                <ProductDetail product={product} isPage />

                <DialogFooter>
                  <DialogClose asChild>
                    <Link
                      prefetch={true}
                      href={`/product/${product.attributes.slug}`}
                    >
                      Descripción completa: Click Aquí
                    </Link>
                  </DialogClose>
                </DialogFooter>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
