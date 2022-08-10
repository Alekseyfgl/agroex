import {
    Column,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {AdvertisementsEntity} from "./advertisements.entity";

@Entity({ name: 'advertisementsImages' })
export class AdvertisementsImagesEntity {
    @ApiProperty({example: 2})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({example: 'https://res.cloudinary.com/agroex-backend/image/upload/v1656319454/rs2k74crvmzu872fm5sh.webp'})
    @Column('varchar')
    img: string;

    @ApiProperty({example: '21', type: () => AdvertisementsEntity})
    @Column('int')
    @ManyToOne(() => AdvertisementsEntity, (advertisement) => advertisement.images, { eager: true })
    @JoinColumn({ name: 'advertisement_id' })
    advertisement_id: string;
}