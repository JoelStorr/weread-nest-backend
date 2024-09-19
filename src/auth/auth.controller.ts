import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private autService: AuthService){}

    @Post("/register")
    async signup(@Body() body: RegisterDto){
        console.log(body)

        return body;

    }


    @Post("/signin")
    async signin(){

    }


    //TODO: Handle re authentication
}
