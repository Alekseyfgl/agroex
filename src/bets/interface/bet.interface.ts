export interface BetAndAdvertInterface {
  id: number;
  img: string;
  createAt: Date;
  updatedAt: Date;
  authorId: number;
  title: string;
  price: string;
  currency: string;
  quantity: string;
  unit: string;
  slug: string;
  category: string;
  subCategory: string;
  isModerated: boolean;
  country: string;
  location: string;
  moderationComment: string | null;
  user_id: number;
  created_at: Date;
  betValue: Date;
  isActive: boolean;
  advertisement_id: number;
}
