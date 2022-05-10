import {Injectable} from "@nestjs/common";
import {CategoriesEntity} from "./categories.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(CategoriesEntity)
                private readonly CategoriesRepository: Repository<CategoriesEntity>
    ) {}

    async findAll(): Promise<CategoriesEntity[]> {
        return await this.CategoriesRepository.find()
    }
}