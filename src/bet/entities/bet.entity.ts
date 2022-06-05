import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {UserBetEntity} from "../user-bet.entity";

@Entity({name: 'bets'})
export class BetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bet: string;


    @OneToMany(() => UserBetEntity, (userBetEntity) => userBetEntity.bet, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ referencedColumnName: 'role_id' })
    userBets!: UserBetEntity[];
}
