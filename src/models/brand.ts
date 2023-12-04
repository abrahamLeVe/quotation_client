export interface BrandsInterface {
  data: BrandInterface[];
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

export interface BrandInterface {
  id: number;
  attributes: Attributes5;
}

interface Attributes5 {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description?: string;
  image: Image;
  products: Products;
  sub_categories: Subcategories;
}

interface Subcategories {
  data: (Datum3 | Data2)[];
}

interface Data2 {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  name: string;
  description?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
}

interface Datum3 {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
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
  formats: Formats;
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

interface Formats {
  small: Small;
  thumbnail: Small;
}

interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
  provider_metadata: Providermetadata;
}

interface Providermetadata {
  public_id: string;
  resource_type: string;
}
