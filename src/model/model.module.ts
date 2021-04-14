import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity} from "./user/user.entity";
import {AccountEntity} from "./account/account.entity";
import {PlanEntity} from "./plan/plan.entity";
import {VideoEntity} from "./video/video.entity";
import {TagEntity} from "./tag/tag.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity,PlanEntity,VideoEntity,TagEntity])],
    exports: [TypeOrmModule],
})
export class ModelModule {}
