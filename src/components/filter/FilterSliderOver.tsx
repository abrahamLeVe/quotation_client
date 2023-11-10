"use client";
import { Tab } from "@headlessui/react";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import SlideOver from "../slide-over/SlideOver";
import FilterSection from "./FilterSection";
import { CartButton } from "../product/ProductCarousel";

export default function FilterSliderOver() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden">
        <CartButton
          onClick={() => setOpen(true)}
          title="Filtro"
          icon={<HiBars3 />}
        />
      </div>

      <SlideOver openMenu={open} setOpenMenu={setOpen}>
        <Tab.Group as="div" className="mt-2">
          <FilterSection />
        </Tab.Group>
      </SlideOver>
    </>
  );
}
