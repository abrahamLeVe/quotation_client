export interface ColorsInterface {
  data: ColorInterface[];
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

export interface ColorInterface {
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
  image: Image;
  products: Products;
  prices: Prices;
}

interface Prices {
  data: Datum2[];
}

interface Datum2 {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  name: string;
  value: number;
  discount?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Products {
  data: Datum[];
}

interface Datum {
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

interface Image {
  data?: any;
}