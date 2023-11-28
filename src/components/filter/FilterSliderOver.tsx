"use client";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";

import SlideOver from "../ui/SlideOver";
import FilterSection from "./FilterSection";
import { CartButtonAction } from "../cart/CartButtonAction";

export default function FilterSliderOver() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <CartButtonAction
        onClick={() => setOpen(true)}
        title="Filtro"
        icon={<IoFilter />}
        className="shadow-md border-none"
      />
      <SlideOver openMenu={open} setOpenMenu={setOpen}>
        <div className="mt-2">
          <FilterSection />
        </div>
      </SlideOver>
    </div>
  );
}
