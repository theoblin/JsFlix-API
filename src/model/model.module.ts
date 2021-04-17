import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity} from "../user/model/user.entity";
import {AccountEntity} from "../account/model/account.entity";
import {PlanEntity} from "../plan/model/plan.entity";
import {VideoEntity} from "../video/model/video.entity";
import {TagEntity} from "../tag/model/tag.entity";
import {AuthModule} from "../auth/module/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity,PlanEntity,VideoEntity,TagEntity]),
    AuthModule],
    exports: [TypeOrmModule],
})
export class ModelModule {}
