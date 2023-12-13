export interface PricesInterface {
  data: PriceInterface[];
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

export interface PriceInterface {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  name?: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  discount?: number;
  product: Product;
  size: Size;
  model: Model;
  product_colors: Productcolors;
}

interface Productcolors {
  data: Datum2[];
}

interface Datum2 {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  Name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  code: string;
}

interface Model {
  data?: any;
}

interface Size {
  data?: Datum;
}

interface Datum {
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