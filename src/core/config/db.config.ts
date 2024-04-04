import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database, enviroment } from '../setting/enviroment';

const synchronize = enviroment.ENV === 'PROD' ? false : true;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: database.HOST,
      port: database.PORT,
      username: database.USER,
      password: database.PASSWORD,
      database: database.DATABASE,
      entities: [__dirname + '/modules/**/entities/*.entity.{ts,js}'],
      autoLoadEntities: true,
      synchronize: synchronize,
    }),
  ],
})
export class DatabaseModule {}
