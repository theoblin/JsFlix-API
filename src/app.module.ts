import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ModelModule} from "./model/model.module";

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

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
