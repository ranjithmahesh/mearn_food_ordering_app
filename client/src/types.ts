export type User = {
  _id: string;
  name: string;
  city: string;
  country: string;
  addressLine1: string;
  email: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};
export type Restaurant = {
  _id: string;
  user: string;
  resturantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};
