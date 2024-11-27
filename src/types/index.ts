export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  discountedPrice?: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  status: 'active' | 'inactive';
  stockQuantity: number;
  categories: Category[];
  images: Image[];
  careInstructions: CareInstructions;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  thumbnail?: Image;
  parentId?: string;
  children?: Category[];
}

export interface Image {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  size: number;
  format: string;
  folder: string;
}

export interface CareInstructions {
  light: string;
  water: string;
  temperature: string;
  humidity: string;
  soil: string;
  fertilizer: string;
  additionalNotes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: User;
  status: 'draft' | 'published' | 'scheduled';
  publishDate?: Date;
  categories: Category[];
  featuredImage?: Image;
  seo: SEOData;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: Image;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'stock' | 'promotion' | 'custom';
  status: 'scheduled' | 'sent' | 'failed';
  scheduledFor?: Date;
  sentAt?: Date;
  recipients: string[];
}

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  shipping: ShippingDetails;
  payment: PaymentDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface ShippingDetails {
  method: string;
  cost: number;
  address: Address;
  trackingNumber?: string;
}

export interface PaymentDetails {
  method: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  amount: number;
}