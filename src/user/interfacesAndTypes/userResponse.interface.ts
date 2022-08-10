import { UserForRegistration } from '../../auth/interfacesAndTypes/userForRegistration';

export interface UserResponseWithTokenInterface {
  user: UserForRegistration & { token: string };
}

export interface UserResponseInterface {
  UserForRegistration;
}
