import Footer from "@/components/footer/Footer";
import Collection from "@/components/lobby/Collection";
import LogoSection from "@/components/lobby/BrandSection";
import NewsletterSection from "@/components/lobby/NewsletterSections";
import PromoSection from "@/components/lobby/PromoSection";
import Testimonials from "@/components/lobby/Testimonials";
import NavBar from "@/components/navbar/NavBar";
import ProductCarousel from "@/components/product/ProductCarousel";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  console.log(session?.user);
  return (
    <>
      <NavBar session={session} />
      <main className="flex flex-col max-w-screen-xl mx-auto items-center gap-5">
        {children}
        <ProductCarousel />
        <Collection />
        <PromoSection />
        <LogoSection />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
