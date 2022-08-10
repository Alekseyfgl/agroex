import { Optional } from '../../interfacesAndTypes/optional.interface';
import {ModerationStatus} from "../../advertisements/interface/interfacesAndTypes";
import {UserRolesEntity} from "../../roles/user-roles.entity";
import {UserEntity} from "../user.entity";

export type User = {
  id: number;
  uuid: string;
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
  moderationStatus: ModerationStatus;
  moderationComment: Optional<string>;
  userRoles: UserRolesEntity[];
};

export type Users = {
  users: User[]
};

export enum userType {
  PERSON = 'person',
  LEGALENTITY = 'legalEntity'
}
