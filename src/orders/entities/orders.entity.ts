import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserBetEntity} from "../../bets/user-bet.entity";

@Entity({name: 'orders'})
export class OrdersEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {length: 20, default: 'confirmed'})
    dealStatus: string



    @OneToOne(() => UserBetEntity)
    @JoinColumn({name: 'bet_id'})
    bet: UserBetEntity

}
