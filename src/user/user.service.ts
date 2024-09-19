import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private repo: Repository<User>){}


    async createUser(username: string, email: string, hashedPassword: string){

        const user = await this.repo.query("INSERT INTO user (email, password, username) VALUES (?,?,?)", [email, hashedPassword, username])


        return user;



    }



}
