import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelModule } from "./model/model.module";
import { AccountController } from './account/controller/account.controller';
import { AccountService } from "./account/service/account.service";
import {AuthModule} from "./auth/module/auth.module";
import {VideoService} from "./video/service/video.service";
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user/user.service';
import { PlanService } from './plan/service/plan/plan.service';
import { PlanController } from './plan/controller/plan/plan.controller';


@Module({
  imports: [
    // ------------------ ORM config --------------------
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'user',
      password: 'pass',
      database: 'jsflix',
      autoLoadEntities: true,
      synchronize: true,
      cli: {
        migrationsDir: 'db.migration',
        entitiesDir: 'src/model/user/user.entity.ts',
      },
    }),
    ModelModule,
    AuthModule,

  ],

  controllers: [AppController, AccountController, UserController, PlanController],
  providers: [AppService, AccountService, VideoService, UserService, PlanService],
})
export class AppModule {}
