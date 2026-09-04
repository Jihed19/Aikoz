export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  priceUSD: number;
  image: string;
  badge?: string;
  badgeType?: 'orange' | 'green' | 'blue' | 'yellow';
  unit?: string;
  isAikozBrand?: boolean;
  description?: string;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  tagColor: 'orange' | 'green' | 'blue' | 'dark';
  footerText: string;
  iconName: string;
  image: string;
  itemCount: number;
}

export interface Ticket {
  id: string;
  code: string;
  date: string;
  store: string;
  purchaseAmount: number;
  isValidated: boolean;
  source: 'app' | 'fiscal_ticket';
  opportunities: number;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'fixed' | 'percentage' | 'delivery' | 'bogo';
  discountValue: number;
  minPurchase: number;
  expiresText: string;
  tag: string;
  borderColor: 'orange' | 'blue' | 'green';
  isApplied?: boolean;
}

export type PaymentMethod = 'cashea' | 'pagomovil' | 'giftcard' | 'zelle';
export type DeliveryMethod = 'delivery' | 'pickup';

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  hours: string;
  isOpen: boolean;
  isMain?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  memberTier: 'Oro' | 'Plata' | 'Diamante';
  ticketsCount: number;
  clubPoints: number;
  giftCardBalance: number;
  isVerified: boolean;
  avatarUrl: string;
}
