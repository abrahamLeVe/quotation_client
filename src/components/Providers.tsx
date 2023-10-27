"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./footer/Footer";
import NavBar from "./navbar/NavBar";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <>
          <NavBar />
          {children}
          <Footer />
        </>
      </QueryClientProvider>
    </>
  );
}
