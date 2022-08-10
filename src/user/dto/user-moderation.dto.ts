import {
    IsEnum,
    IsInt, IsOptional,
    IsString,
} from 'class-validator';
import {ModerationStatus} from "../../advertisements/interface/interfacesAndTypes";

export class ModerationDataDto {
    @IsInt()
    readonly userId: number;

    @IsEnum(ModerationStatus)
    readonly moderationStatus: ModerationStatus;

    @IsOptional()
    @IsString()
    readonly moderationComment: string;
}