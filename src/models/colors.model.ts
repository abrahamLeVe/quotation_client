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
  attributes: Attributes4;
}

interface Attributes4 {
  Name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  code: string;
  image: Image;
  products: Products;
  prices: Prices;
}

interface Prices {
  data: Datum3[];
}

interface Datum3 {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  name: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  discount: number;
}

interface Products {
  data: Datum2[];
}

interface Datum2 {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
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

interface Image {
  data?: Datum;
}

interface Datum {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata: Providermetadata;
  createdAt: string;
  updatedAt: string;
}

interface Providermetadata {
  public_id: string;
  resource_type: string;
}
