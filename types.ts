export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'mate' | 'bombilla' | 'accesorio' | 'set';
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'Efectivo' | 'Transferencia';

export interface CheckoutDetails {
  name: string;
  address: string;
  paymentMethod: PaymentMethod;
  notes: string;
}
