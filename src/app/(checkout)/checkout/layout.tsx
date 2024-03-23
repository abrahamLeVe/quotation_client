import CheckoutIndex from "@/components/checkout/CheckoutIndex";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col md:container m-auto relative p-20">
        <Breadcrumbs
          segments={[
            {
              title: "Carrito",
              href: "/cart",
            },
            {
              title: "Cotización",
              href: "",
            },
          ]}
        />
        <CheckoutIndex />
        {children}
      </main>
    </>
  );
}
