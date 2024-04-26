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
  typeContact?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  title: string;
  rating?: number;
  contact_type: contactType;
}

interface contactType {
  id: number;
}

//------------
export interface ContactsDataInterface {
  data: ContacDataInterface[];
}

export interface ContacDataInterface {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  name: string;
  email: string;
  phone: string;
  message: string;
  responseContact: string;
  stateMessage: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  rating: number;
  contact_type: Contacttype;
}

interface Contacttype {
  data: Data;
}

interface Data {
  id: number;
  attributes: Attributes;
}
