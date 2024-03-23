import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs
        segments={[
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Mis cotizaciones",
            href: "",
          },
        ]}
      />
      {children}
    </>
  );
}
