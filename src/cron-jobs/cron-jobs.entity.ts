import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {UserBetEntity} from "../bet/user-bet.entity";


@Entity({name: 'cronJobs'})
export class CronJobsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column("varchar")
    name: string;

    @CreateDateColumn()
    date: Date;

    @Column("integer")
    betId: number;
}