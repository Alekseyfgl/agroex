import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { numToEncode } from '../constans/constans';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column({ select: false }) //так мы исключаем пароль по умолчанию
  password: string;

  @Column({ default: null })
  role: string;

  @Column({ default: null })
  image: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, numToEncode);
  }
}
