import {ORDER} from "../../constans/constans";

export enum ModerationStatus {
  UNMODERATED = 'unmoderated',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type Filterobj = {
  isActive?: boolean;
  isModerated?: boolean;
  authorId?: number;
  order?: ORDER
};

export enum AdType {
  ACTIVE = 'active',
  PENDING = 'pending',
  INACTIVE = 'inactive'
}

export enum Category  {
  FRUITS= 'Fruits',
  DRY_FRUITS = 'Dry fruits',
  VEGETABLES = 'Vegetables',
  CROPS = 'Crops',
}
