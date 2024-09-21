import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { UserModule } from 'src/user/user.module';
import { List } from './list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    
  ],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService, TypeOrmModule],
})
export class ListsModule {}
