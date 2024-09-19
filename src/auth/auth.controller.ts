import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private autService: AuthService){}

    @Post("/register")
    async signup(@Body() body: RegisterDto){
        
        

        const user = await this.autService.createUser(body.username, body.email, body.password);
        console.log(user);
        return user;

    }


    @Post("/signin")
    async signin(){

    }


    //TODO: Handle re authentication
}
