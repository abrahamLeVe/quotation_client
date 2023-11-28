import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="flex flex-row max-w-screen-xl mx-auto gap-5 relative p-3 md:p-5">
        <div className="w-[100px] min-h-screen border">Filtro</div>
        {children}
      </main>
      <Footer />
    </>
  );
}
