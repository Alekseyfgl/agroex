import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'advertisements'})
export class AdvertisementsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column("varchar", { length: 200 })
    title: string;

    @Column('decimal', {precision: 18, scale: 2})
    price: number;

    @Column("varchar", { length: 3 })
    currency: string;

    @Column()
    img: string;

    @Column('decimal', {precision: 18, scale: 2})
    weight: number;

    @Column("varchar", { length: 5 })
    unit: string;
}