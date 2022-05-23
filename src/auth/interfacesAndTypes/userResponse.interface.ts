
import { UserForRegistration } from './userForRegistration';

export interface UserResponseInterface{
  user: UserForRegistration & {token: string}
}

