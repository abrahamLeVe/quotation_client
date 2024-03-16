export interface Items {
  id: string;
  title?: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id?: string;
  unit_price?: number;
}

export interface Quotation {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  email: string;
  products: Producto[];
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

interface Producto {
  id: string;
  title: string;
  colors?: Color[];
  quantity: number;
  picture_url: string;
  size?: string;
}

interface Color {
  id: number;
  quantity: number;
}
