export interface ReviewsInterface {
  data: ReviewInterface[];
  meta: Meta;
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

export interface ReviewInterface {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product: Product;
  user: User;
}

interface User {
  data: Data2;
}

interface Data2 {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  observer: boolean;
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
  rating: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  rating_count: string;
}
