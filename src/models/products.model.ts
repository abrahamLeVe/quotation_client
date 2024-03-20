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
  attributes: Attributes7;
}

interface Attributes7 {
  name: string;
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
  product_colors: Productcolors;
  prices: ProductPricesInterface;
  documents: Documents;
}

export interface ProductPricesInterface {
  data: ProductPriceInterface[];
}

export interface ProductPriceInterface {
  id: number;
  attributes: Attributes6;
}

export interface Documents {
  data: DocumentData[];
}

interface DocumentData {
  id: number;
  attributes: Attributes2;
}

interface Attributes2 {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  file: File;
}

interface File {
  data: Data;
}

interface Data {
  id: number;
  attributes: AttributesFile;
}

interface AttributesFile {
  name: string;
  alternativeText?: any;
  caption?: any;
  width?: any;
  height?: any;
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

interface Attributes6 {
  name?: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  discount?: null | number | number;
  product_colors: Productcolors2;
  model: Model;
  size: Size;
  categories: Categories;
}

interface Size {
  data?: Datum5;
}

interface Datum5 {
  id: number;
  attributes: Attributes5;
}

interface Attributes5 {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  value: number;
  category: Category;
}

interface Category {
  data: CategoriesDataInterface;
}

interface Model {
  data?: any;
}

interface Productcolors2 {
  data: ColorProduct[];
}

interface Productcolors {
  data: ColorProduct[];
}

export interface ColorProduct {
  id: number;
  attributes: Attributes4;
}

interface Attributes4 {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  code: string;
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
  data: Datum;
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
