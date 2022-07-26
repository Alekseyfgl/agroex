import { Optional } from '../../interfacesAndTypes/optional.interface';

export type UserType = {
  id: number;
  type: userType;
  email: string;
  name: string;
  surname: string;
  phone: string;
  image: Optional<string>;
  companyName: string;
  companyTaxNumber: string;
  bankAccount: string;
  certificateImage: string;
  banned: boolean;
  banReason: Optional<string>;
};

export enum userType {
  PERSON = 'person',
  LEGALENTITY = 'legalEntity'
}
