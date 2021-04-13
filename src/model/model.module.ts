import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationEntity} from "./publication/publication.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PublicationEntity])],
    exports: [TypeOrmModule],
})
export class ModelModule {}
