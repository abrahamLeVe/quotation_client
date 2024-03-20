import { ProductCart } from "./cart.model";

export interface Quotation {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  email: string;
  products: ProductCart[];
  name?: any;
  ruc?: any;
  dni?: any;
  direction?: any;
  phone?: any;
  dayLimit: number;
  details?: any;
  notes?: any;
  dateLimit: string;
  codeStatus?: string;
}
