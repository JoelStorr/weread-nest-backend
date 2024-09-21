import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(@InjectRepository(List) private repo: Repository<List>) {}

  // Note: Create default list for user
  //Lists Read, Current Reads
  async createDefaultLists(userId: number): Promise<number[]> {
    const insertedLists = await this.repo.query(
      'INSERT INTO list (name, userId) VALUES (?,?), (?,?)',
      ['Read', userId, 'Current Reads', userId],
    );

    return insertedLists;
  }

  // Note: Create a new List
  async createList(userId: number, name: string, privateList: boolean) {
    const insertedList = await this.repo.query(
      'INSERT INTO list (name, userId, privateList) VALUES (?,?,?)',
      [name, userId, privateList],
    );

    return insertedList;
  }

  // Note: Load list
  async loadAllLists(userId: number) {
    const lists = await this.repo.query(
      'SELECT id, name FROM list WHERE userId=?',
      [userId],
    );
    return lists;
  }

  //NOTE: Delete List
  async deleteList(userId: number, listId: number) {
    //TODO: Make sure that the user can't delete the lists created on auto setup
    try {
      //Find List on id
      const listUser = await this.repo.query(
        'SELECT userId FROM list WHERE id=?',
        [listId],
      );

      if (listUser.length > 1)
        throw new Error('Only one element with that id should exist');
      if (listUser.length === 0)
        throw new Error("You don't have a list with this ID");

      //Check if userId on list mathces the current users id
      if (listUser[0].userId === userId) {
        //DELTE list on id
        const deletedList = await this.repo.query(
          'DELETE FROM list WHERE id=?',
          [listId],
        );

        return listId;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("You don't have a list with this ID");
    }
  }
}
