import { getContactTypes } from "@/app/services/contact.service";
import { ContactForm } from "@/components/contact/ContactForm";

export default async function ContactPage() {
  const { data } = await getContactTypes();
  return <ContactForm contacts={data} />;
}
