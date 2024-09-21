import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(@InjectRepository(List) private repo: Repository<List>) {}

  // TODO: Create default list for user
  //Lists Read, Current Reads
  async createDefaultLists(userId: number): Promise<number[]> {
    const insertedLists = await this.repo.query(
      'INSERT INTO list (name, userId) VALUES (?,?), (?,?)',
      ['Read', userId, 'Current Reads', userId],
    );

    return insertedLists;
  }

  // TODO: Create a new List
  async createList(userId: number, name: string, privateList: boolean) {
    const insertedList = await this.repo.query(
      'INSERT INTO list (name, userId, privateList) VALUES (?,?,?)',
      [name, userId, privateList],
    );

    return insertedList;
  }

  // TODO: Load list
  async loadAllLists(userId: number){

    const lists = await this.repo.query("SELECT id, name FROM list WHERE userId=?", [userId])

    return lists;

  }
}
