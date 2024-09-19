import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private repo: Repository<User>){}


    async createUser(username: string, email: string, hashedPassword: string):Promise<number|null>{

        let user:number;

        try{

            user = await this.repo.query("INSERT INTO user (email, password, username) VALUES (?,?,?)", [email, hashedPassword, username])
        } catch(error){

            console.log(error.driverError);

            if (error.driverError.code === 'SQLITE_CONSTRAINT') {
                console.log('error triggered');
            }
            
            throw new ConflictException("Username or Email are already taken")
        }



        return user;



    }



}
