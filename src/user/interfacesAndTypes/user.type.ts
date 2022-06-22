import { Optional } from '../../interfacesAndTypes/optional.interface';

export type UserType = {
  id: number;
  email: string;
  username: string;
  phone: string;
  image: Optional<string>;
  banned: boolean;
  banReason: Optional<string>;
};
