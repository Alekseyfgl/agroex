import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {BetEntity} from "./entities/bet.entity";


@Entity({name: 'userBets'})
export class UserBetEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    bet_id: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.userBets)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => BetEntity, (betEntity) => betEntity.userBets)
    @JoinColumn({ name: 'bet_id' })
    bet: BetEntity;
}