import { ProductCart } from "./cart.model";

export interface Quotation {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  email: string;
  products: ProductCart[];
  name?: any;
  tipe_doc: string;
  location: any;
  direction?: string;
  phone?: string;
  dayLimit: number;
  details?: any;
  notes?: any;
  dateLimit: string;
  codeStatus?: string;
  num_doc: string;
}

export interface QuotationData {
  name: string;
  email: string;
  tipe_doc: string;
  direction: string;
  num_doc: string;
  phone: string;
  departamento: string;
  provincia: string;
  distrito: string;
  location: Location;
  details?: string | undefined;
}

interface Location {
  departamento: string;
  provincia: string;
  distrito?: string | undefined;
}
