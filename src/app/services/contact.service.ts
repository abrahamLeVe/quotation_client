import { fetchDataFromApi, postDataFromApi } from "@/lib/api";
import {
  ContactMessageInterface,
  ContactsInterface,
  DataContactInterface,
} from "@/models/contact.model";
let qs = require("qs");

export const getContactTypes = async (): Promise<ContactsInterface> => {
  const queryString = qs.stringify(
    {
      sort: ["name:asc"],
      fields: ["name"],
    },
    { encodeValuesOnly: true }
  );
  const res = await fetchDataFromApi(`/api/contact-types?${queryString}`);
  return res;
};

interface PostContactMessagePros {
  dataContact: ContactMessageInterface;
}

export async function postContactMessage({
  dataContact,
}: PostContactMessagePros) {
  const res = await postDataFromApi("/api/contacts", dataContact);
  return res;
}
