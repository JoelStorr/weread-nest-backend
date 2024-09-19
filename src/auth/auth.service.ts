import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UserService } from 'src/user/user.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private userService: UserService){}



    async createUser (username: string, email: string, password:string){

        //TODO: Hash the users password

        
        // Hashing the user password

        //Generate Salt
        const salt = randomBytes(8).toString("hex");

        //Hash salted password
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const hashedAndSalted = salt + '.' + hash.toString('hex');


        const user = await this.userService.createUser(username, email, hashedAndSalted);

        return user

    }



}
