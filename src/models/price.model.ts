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

interface PriceInterface {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  name: string;
  value: number;
  discount?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product: Product;
  size: Size;
  model: Model;
  product_colors: Productcolors;
  categories: Categories;
}

interface Categories {
  data: any[];
}

interface Productcolors {
  data: Datum2[];
}

interface Datum2 {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  name: string;
  description: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
  value: number;
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
  description: string;
  slug: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}