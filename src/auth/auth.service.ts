import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService){}



    async createUser (username: string, email: string, password:string){

        const user = await this.userService.createUser(username, email, password)

        return user

    }



}
