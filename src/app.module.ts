import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelModule } from "./model/model.module";
import { AccountController } from './account/controller/account.controller';
import { AccountService } from "./account/service/account.service";
import {AuthModule} from "./auth/module/auth.module";


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

  controllers: [AppController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule {}
