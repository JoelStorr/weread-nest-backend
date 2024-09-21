import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserErrors } from 'lib/error.types';
import { ListsService } from 'src/lists/lists.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private listsService: ListsService
  ) {}

  async createUser(
    username: string,
    email: string,
    hashedPassword: string,
  ): Promise<number | null> {
    let user: number;
    let insertedLists: number[];

    username = username.toLowerCase();

    try {
      user = await this.repo.query(
        'INSERT INTO user (email, password, username) VALUES (?,?,?)',
        [email, hashedPassword, username],
      );

      insertedLists = await this.listsService.createDefaultLists(user);


    } catch (error) {
      console.log(error.driverError);

      if (error.driverError.code === 'SQLITE_CONSTRAINT') {
        console.log('error triggered');
        throw new ConflictException('Username or Email are already taken');
      }

      throw new ConflictException('Something went wrong');
    }

    return user;
  }

  async findUserById(id: number) {
    let user: User[];

    try {
      user = await this.repo.query('SELECT * FROM user WHERE id=?', [id]);

      if (user.length === 0) {
        throw new Error(UserErrors.lengthOfZero);
      }

      if (user.length > 1) {
        throw new Error(UserErrors.lengthOverOne);
      }
    } catch (error) {
      console.log(error);

      throw new NotFoundException(
        'Could not find the user you are looking for',
      );
    }

    return user[0];
  }

  async findUserByName(username: string) {
    let user: User[];

    try {
      user = await this.repo.query('SELECT * FROM user WHERE username=?', [
        username,
      ]);

      if (user.length === 0) {
        throw new Error(UserErrors.lengthOfZero);
      }

      if (user.length > 1) {
        throw new Error(UserErrors.lengthOverOne);
      }
    } catch (error) {
      console.log(error);

      throw new NotFoundException(
        'Could not find the user you are looking for',
      );
    }

    return user[0];
  }

  async findUserByEmail(email: string) {
    let user: User[];

    try {
      user = await this.repo.query('SELECT * FROM user WHERE email=?', [email]);

      if (user.length === 0) {
        throw new Error(UserErrors.lengthOfZero);
      }

      if (user.length > 1) {
        throw new Error(UserErrors.lengthOverOne);
      }
    } catch (error) {
      console.log(error);

      throw new NotFoundException(
        'Could not find the user you are looking for',
      );
    }

    return user[0];
  }
}
