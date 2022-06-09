import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {UserBetEntity} from "../bets/user-bet.entity";


@Entity({name: 'advertisements'})
export class AdvertisementsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column("varchar", {length: 200})
    title: string;

    @Column("varchar", {length: 100})
    country: string;

    @Column("varchar", {length: 300})
    location: string;

    @Column({unique: true})
    slug: string

    @Column({default: null})
    category: string

    @Column({default: null})
    subCategory: string


    @Column({default: false})
    isModerated: boolean

    @Column( {default: null})
    moderationComment: string

    @Column('decimal', {precision: 18, scale: 2})
    price: number;

    @Column("varchar", {length: 3})
    currency: string;

    @Column()
    img: string;

    @Column('decimal', {precision: 18, scale: 2})
    quantity: number;

    @Column("varchar", {length: 5})
    unit: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date


    @ManyToOne(() => UserEntity, user => user.advertisements, {eager: true})
    author: UserEntity


    @OneToMany(() => UserBetEntity, (userBetEntity) => userBetEntity.advertisement, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({referencedColumnName: 'advertisement_id'})
    userBets!: UserBetEntity[];
}