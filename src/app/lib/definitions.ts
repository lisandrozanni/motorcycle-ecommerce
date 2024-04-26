// Motorcycles page
export interface MotorcyleProps {
  name: string;
  uuid: string;
  categories: {
    name: string;
  }[];
  variants: {
    prices: {
      amount: number;
    }[];
    images: {
      url: string;
    }[];
  }[];
}

// Accessories page
export interface AccessoryProps {
  name: string;
  uuid: string;
  variants: {
    prices: {
      amount: number;
    }[];
    images: {
      url: string;
    }[];
  }[];
}

// Quotation Detail page
export interface Accessory {
  name: string;
  uuid: number;
  variants: Variant[];
}

export interface Variant {
  prices: { amount: number }[];
  images: { url: string }[];
}

export interface AccessoryListProps {
  accessories: Accessory[];
  onAddAccessory: (uuid: number) => void;
}

export interface AccessoryWithQuantity {
  accessory: Accessory;
  quantity: number;
}

export interface QuotationDetailProps {
  motorcycleName?: string;
  uuid: string;
  motorcyclePrice?: string;
  motorcycleDescription?: string;
  accessories: Accessory[];
}

// API
export interface MotorcycleDetail {
  name: string;
  images: string[];
  description: string;
  price: number;
}

export interface AccessoryDetail {
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface Contact {
  firstname: string;
  email: string;
  phone: string;
}

export interface ApiPayload {
  uuid: string;
  contact: Contact;
}

export interface ApiResponse {
  response: string;
  msg: string;
  code: number;
}
