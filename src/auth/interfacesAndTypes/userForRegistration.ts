import { UserEntity } from '../../user/user.entity';

export type UserForRegistration = Omit<UserEntity, 'hashPassword'> // все поля UserEntity без поля hashPassword