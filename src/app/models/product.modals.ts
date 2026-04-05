// Price - პროდუქტის ფასი
export interface Price {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

// Category - კატეგორია
export interface Category {
  id: string;
  name: string;
  image: string;
}

// Product - მთავარი პროდუქტის მოდელი
export interface Product {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  brand: string;
  rating: number;
  stock: number;
  warranty: number;
  issueDate: string;
  price: Price;
  category: Category;
}

// /products/all-ის response
export interface ProductsResponse {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: Product[];
}
