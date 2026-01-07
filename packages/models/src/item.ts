export enum ItemCondition {
  Good = 'good',
  New = 'new',
  Fair = 'fair',
  Poor = 'poor',
}

export enum ItemStatus {
  Listed = 'listed',
  Sold = 'sold',
  Reserved = 'reserved',
}

export interface ItemSubscription {
  type: 'telegram'|'whatsapp',
  telegramUserId?: number,
  telegramUsername?: string,
  whatsappUserId?: string,
  whatsappProfileName?: string,
}

export interface Item {
  id: string;
  slug: string;
  name: string;
  status?: ItemStatus;

  category?: string;
  condition?: ItemCondition;
  imageUrl?: string;

  tags?: string[];

  price: number;
  description?: string;
  createdAt?: string;

  purchasedAt?: string;
  purchasedPrice?: number;

  productUrl?: string;

  likes?: number;

  subscribers?: ItemSubscription[];
}
