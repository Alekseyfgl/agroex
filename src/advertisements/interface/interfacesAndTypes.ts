export enum ModerationStatus {
  UNMODERATED = 'unmoderated',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type Filterobj = {
  isActive?: boolean;
  isModerated?: boolean;
  authorId?: number;
};

export enum Category {
  FRUITS = 'Fruits',
  DRY_FRUITS = 'Dry Fruits',
  VEGETABLES = 'Vegetables',
  CROPS = 'Crops',
}
