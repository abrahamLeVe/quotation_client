export interface SizesInterface {
  data: SizeInterface[];
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

export interface SizeInterface {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  value: number;
  prices: Prices;
  categories: Categories;
  products: Products;
}

interface Products {
  data: Datum3[];
}

interface Datum3 {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  name: string;
  description: string;
  slug: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Categories {
  data: Datum2[];
}

interface Datum2 {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description?: any;
}

interface Prices {
  data: Datum[];
}

interface Datum {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  name: string;
  value: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
