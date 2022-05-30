import {BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'advertisements'})
export class AdvertisementsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column("varchar", {length: 200})
    title: string;

    @Column()
    description: string;

    @Column('decimal', {precision: 18, scale: 2})
    price: number;

    @Column("varchar", {length: 3})
    currency: string;

    @Column()
    img: string;

    @Column('decimal', {precision: 18, scale: 2})
    weight: number;

    @Column("varchar", {length: 5})
    unit: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date

    @BeforeUpdate()//чтобы автоматически обновлять updatedAt
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}