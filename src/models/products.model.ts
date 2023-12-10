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
  product_colors: Productcolors;
  prices: ProductPricesInterface;
}

export interface ProductPricesInterface {
  data: ProductPriceInterface[];
}

export interface ProductPriceInterface {
  id: number;
  attributes: Attributes6;
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
  numberUSA: number;
  numberLatam: number;
  cmFoot: number;
  category: Category;
}

interface Category {
  data: CategoriesDataInterface;
}

interface Model {
  data?: any;
}

interface Productcolors2 {
  data: Datum4[][];
}

interface Productcolors {
  data: Datum4[];
}

interface Datum4 {
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
// export interface ProductsInterface {
//   data: ProductInterface[];
//   meta: Meta;
// }

// interface Meta {
//   pagination: Pagination;
// }

// interface Pagination {
//   page: number;
//   pageSize: number;
//   pageCount: number;
//   total: number;
// }

// export interface ProductInterface {
//   id: number;
//   attributes: Attributes8;
// }

// interface Attributes8 {
//   name: string;
//   price: number;
//   discount: number;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   slug: string;
//   rating: number;
//   image: Image;
//   thumbnail: Thumbnail;
//   categories: Categories;
//   brand: Brand;
//   sub_categories: Subcategories;
//   models: Models;
//   product_colors: Productcolors;
//   prices: Prices;
//   sizes: Sizes;
// }

// interface Sizes {
//   data: Datum7[];
// }

// interface Datum7 {
//   id: number;
//   attributes: Attributes7;
// }

// interface Attributes7 {
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   numberUSA: number;
//   numberLatam: number;
//   cmFoot: number;
// }

// interface Prices {
//   data: Datum6[];
// }

// interface Datum6 {
//   id: number;
//   attributes: Attributes6;
// }

// interface Attributes6 {
//   name: string;
//   value: number;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   discount?: number;
// }

// export interface Productcolors {
//   data: Datum5[];
// }

// interface Datum5 {
//   id: number;
//   attributes: Attributes5;
// }

// interface Attributes5 {
//   Name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   code: string;
// }

// interface Models {
//   data: any[];
// }

// interface Subcategories {
//   data: (Datum4 | Datum3)[];
// }

// interface Datum4 {
//   id: number;
//   attributes: Attributes4;
// }

// interface Attributes4 {
//   name: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   description?: any;
// }

// export interface Brand {
//   data?: Datum3;
// }

// interface Datum3 {
//   id: number;
//   attributes: Attributes3;
// }

// interface Attributes3 {
//   name: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   description?: string;
// }

// export interface Categories {
//   data: CategoriesDataInterface[];
// }

// export interface CategoriesDataInterface {
//   id: number;
//   attributes: Attributes2;
// }

// interface Attributes2 {
//   name: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// }

// interface Thumbnail {
//   data: Datum;
// }

// interface Image {
//   data: Datum[];
// }

// interface Datum {
//   id: number;
//   attributes: Attributes;
// }

// interface Attributes {
//   name: string;
//   alternativeText?: any;
//   caption?: any;
//   width: number;
//   height: number;
//   formats: Formats;
//   hash: string;
//   ext: string;
//   mime: string;
//   size: number;
//   url: string;
//   previewUrl?: any;
//   provider: string;
//   provider_metadata: Providermetadata;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Formats {
//   small: Small;
//   thumbnail: Small;
// }

// interface Small {
//   ext: string;
//   url: string;
//   hash: string;
//   mime: string;
//   name: string;
//   path?: any;
//   size: number;
//   width: number;
//   height: number;
//   provider_metadata: Providermetadata;
// }

// interface Providermetadata {
//   public_id: string;
//   resource_type: string;
// }

// export interface PriceBySize {
//   data: DataPrice[];
//   meta?: Meta;
// }

// interface Meta {
//   pagination: Pagination;
// }

// interface Pagination {
//   page: number;
//   pageSize: number;
//   pageCount: number;
//   total: number;
// }

// export interface DataPrice {
//   id: number;
//   attributes: Attributes3;
// }

// interface Attributes3 {
//   name: string;
//   value: number;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   discount?: any;
//   product: Product;
//   size: Size;
//   model: Model;
// }

// interface Model {
//   data?: any;
// }

// interface Size {
//   data: Data2;
// }

// interface Data2 {
//   id: number;
//   attributes: Attributes2;
// }

// interface Attributes2 {
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   numberUSA: number;
//   numberLatam: number;
//   cmFoot: number;
// }

// interface Product {
//   data: Data;
// }

// interface Data {
//   id: number;
//   attributes: Attributes;
// }

// interface Attributes {
//   name: string;
//   price: number;
//   discount: number;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   slug: string;
//   rating: number;
// }

// export interface SizeByPrice {
//   data: DataSize[];
//   meta: Meta;
// }

// interface Meta {
//   pagination: Pagination;
// }

// interface Pagination {
//   page: number;
//   pageSize: number;
//   pageCount: number;
//   total: number;
// }

// export interface DataSize {
//   id: number;
//   attributes: Attributes4;
// }

// interface Attributes4 {
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   numberUSA: number;
//   numberLatam: number;
//   cmFoot: number;
//   prices: PricesSizeByP;
//   category: Category;
//   products: Products;
// }

// interface Products {
//   data: DatumSizeByPrice[];
// }

// interface DatumSizeByPrice {
//   id: number;
//   attributes: AttributesSizeByPrice;
// }

// interface AttributesSizeByPrice {
//   name: string;
//   price: number;
//   discount: number;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   slug: string;
//   rating: number;
// }

// interface Category {
//   data: DataByPC;
// }

// interface DataByPC {
//   id: number;
//   attributes: AttributesDataByPC;
// }

// interface AttributesDataByPC {
//   name: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// }

// interface PricesSizeByP {
//   data: DataDByPC[];
// }

// interface DataDByPC {
//   id: number;
//   attributes: Attributes;
// }

// interface Attributes {
//   name: string;
//   value: number;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   discount: number;
// }
