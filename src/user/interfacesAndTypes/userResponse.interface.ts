import { UserForRegistration } from '../../auth/interfacesAndTypes/userForRegistration';

export interface UserResponseInterface {
  user: UserForRegistration & { token: string };
}
