export interface ProductsInterface {
  data: ProductInterface[];
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

export interface ProductInterface {
  id: number;
  attributes: Attributes6;
}

interface Attributes6 {
  name: string;
  price: number;
  discount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  rating: number;
  image: Image;
  thumbnail: Thumbnail;
  categories: Categories;
  brand: Brand;
  sub_categories: Subcategories;
  product_sizes: Productsizes;
  product_colors: Productcolors;
}

interface Productcolors {
  data: Datum5[];
}

interface Datum5 {
  id: number;
  attributes: Attributes5;
}

interface Attributes5 {
  Name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Productsizes {
  data: any[];
}

interface Subcategories {
  data: (Datum4 | Datum3)[];
}

interface Datum4 {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description?: any;
}

export interface Brand {
  data?: Datum3;
}

interface Datum3 {
  id: number;
  attributes: Attributes3;
}

interface Attributes3 {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description?: string;
}

export interface Categories {
  data: CategoriesDataInterface[];
}

export interface CategoriesDataInterface {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Thumbnail {
  data?: Datum;
}

interface Image {
  data: Datum[];
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
