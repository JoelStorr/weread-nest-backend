import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, CurrentUserInterceptor, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
  }],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
