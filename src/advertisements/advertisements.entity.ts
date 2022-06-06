import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../user/user.entity";


@Entity({name: 'advertisements'})
export class AdvertisementsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column("varchar", { length: 200 })
    title: string;

    @Column("varchar", { length: 100 })
    country: string;

    @Column()
    location: string;

    @Column({unique: true})
    slug: string

    @Column({ default: null })
    category: string

    @Column({ default: null })
    subCategory: string


    @Column({ default: false })
    isModerated: boolean

    @Column( {default: null})
    moderationComment: string

    @Column('decimal', {precision: 18, scale: 2})
    price: number;

    @Column("varchar", { length: 3 })
    currency: string;

    @Column()
    img: string;

    @Column('decimal', {precision: 18, scale: 2})
    quantity: number;

    @Column("varchar", { length: 5 })
    unit: string;

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @ManyToOne(() => UserEntity, user => user.advertisements, {eager: true})
    author: UserEntity
}