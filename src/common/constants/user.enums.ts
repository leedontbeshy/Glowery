export type UserRole = 'user' | 'seller' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export type ProductStatus = 'active' | 'inactive' | 'out_of_stock';

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

export type PaymentMethod = 'cod' | 'bank_transfer' | 'vnpay' | 'momo' | 'zalopay' | 'credit_card';
export type PaymentStatus =
    | 'pending'
    | 'processing'
    | 'completed'
    | 'failed'
    | 'refunded'
    | 'cancelled';

export type DiscountType = 'percent' | 'fixed';

export type NoficationType = 'order' | 'promotion' | 'review' | 'system' | 'payment';
