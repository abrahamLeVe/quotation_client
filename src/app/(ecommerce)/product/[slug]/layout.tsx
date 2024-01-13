import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="flex flex-col md:container mx-auto gap-5 relative p-3 md:p-5">
        {children}
      </main>
      <Footer />
    </>
  );
}
