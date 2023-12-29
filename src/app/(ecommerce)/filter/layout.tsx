import FilterSlider from "@/components/filter/FilterSlider";
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
      <main className="flex overflow-hidden flex-row max-w-screen-xl  mx-auto gap-5 relative p-3 md:p-5">
        <FilterSlider />
        <div className={`w-full min-h-screen flex flex-col gap-3 z-10`}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
