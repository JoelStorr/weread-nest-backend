import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { ListsModule } from './lists/lists.module';
import { List } from './lists/list.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>{
          // Allows us to change the db based on the enviornment
        return {
          type: "sqlite",
          database: "db.sqlite",
          entities: [User, List],
          synchronize: true
        }
      }
    }),
    UserModule, AuthModule, ListsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService, JwtService],
})
export class AppModule {}
