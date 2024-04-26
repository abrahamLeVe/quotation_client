import { fetchDataFromApi, postDataFromApi } from "@/lib/api";
import {
  ContactMessageInterface,
  ContactsDataInterface,
  ContactsInterface,
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

export const postContactMessage = async (data: ContactMessageInterface) => {
  const res = await postDataFromApi("/api/contacts", data);
  return res;
};

export const getContactData = async (): Promise<ContactsDataInterface> => {
  const queryString = qs.stringify(
    {
      populate: "*",
      filters: {
        contact_type: {
          name: {
            $eq: "Testimonio",
          },
        },
      },
      sort: ["name:asc"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetchDataFromApi(`/api/contacts?${queryString}`);
  return res;
};
