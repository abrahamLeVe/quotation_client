export interface PriceById {
  data: Datum[];
  meta?: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Datum {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  name?: any;
  value: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  discount?: any;
  product: Product;
  size: Size;
  model: Model;
}

interface Model {
  data?: any;
}

interface Size {
  data: Data2;
}

interface Data2 {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  numberUSA: number;
  numberLatam: number;
  cmFoot: number;
}

interface Product {
  data: Data;
}

interface Data {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  name: string;
  price: number;
  discount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  rating: number;
}