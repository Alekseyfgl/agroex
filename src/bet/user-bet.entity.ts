import {BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {AdvertisementsEntity} from "../advertisements/advertisements.entity";


@Entity({name: 'userBets'})
export class UserBetEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    advertisement_id: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn({default: null})
    expireBet: Date


    @Column()
    betValue: number;

    @Column({default: true})
    isActive: boolean


    @ManyToOne(() => UserEntity, (userEntity) => userEntity.userBets)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;


    @ManyToOne(() => AdvertisementsEntity, (advertisementEntity) => advertisementEntity.userBets)
    @JoinColumn({name: 'advertisement_id'})
    advertisement: AdvertisementsEntity;
}