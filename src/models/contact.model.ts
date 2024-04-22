export interface ContactsInterface {
  data: ContactTypeInterface[];
}

export interface ContactTypeInterface {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  name: string;
  description: null | string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ContactMessageInterface {
  data: DataContactInterface;
}

export interface DataContactInterface {
  name: string;
  email: string;
  phone: string;
  message: string;
  title: string;
  rating?: number;
  contact_type: Contacttype;
}

interface Contacttype {
  id: number;
}
