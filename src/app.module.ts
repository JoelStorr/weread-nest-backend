import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { ListsModule } from './lists/lists.module';
import { List } from './lists/list.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, List],
      synchronize: true,
    }),
    UserModule, AuthModule, ListsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
