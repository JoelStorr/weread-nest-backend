import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {


    @Post("/signup")
    async signup(){

    }


    @Post("/signin")
    async signin(){

    }


    //TODO: Handle re authentication
}
