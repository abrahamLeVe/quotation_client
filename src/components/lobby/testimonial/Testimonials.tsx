"use client";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ContactsDataInterface } from "@/models/contact.model";
import { TestimonialCarrousel } from "./TestimonialCarrousel";

interface TestimonialProps {
  contacts: ContactsDataInterface;
}

export default function Testimonials({ contacts }: TestimonialProps) {
  return (
    <div className="w-full py-14">
      <div className="flex flex-col gap-10">
        <div className="mx-auto px-4  lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Testimonios
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-900 dark:text-gray-400">
            Descubre lo que nuestros clientes tienen que decir sobre su
            experiencia utilizando nuestros servicios y productos. Aquí
            encontrarás testimonios reales de personas que han confiado en
            nosotros para satisfacer sus necesidades en la industria de los
            transformadores y accesorios eléctricos.
          </p>
        </div>
        {contacts.data.length > 0 ? (
          <TestimonialCarrousel contacts={contacts} />
        ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Aún no tenemos su testimonio</AlertTitle>
            <AlertDescription>
              Su experiencia es importante para nosotros. ¡Compártala con
              nuestra comunidad! Si desea dejar su testimonio, por favor{" "}
              <a href="/contact">haga clic aquí</a>.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
