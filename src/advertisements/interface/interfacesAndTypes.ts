export enum ModerationStatus {
  UNMODERATED = 'unmoderated',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type Filterobj = {
  isActive?: boolean,
  isModerated?: boolean,
  authorId?: number
}
