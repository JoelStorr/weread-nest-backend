import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { SigninNameDto } from './dtos/signinName.dto';
import { SigninEmailDto } from './dtos/signinEmail.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async signup(@Body() body: RegisterDto) {
    const user = await this.authService.createUser(
      body.username,
      body.email,
      body.password,
    );
    console.log(user);
    return user;
  }

  //TODO: Build interceptor to remove password from return data

  @Post('/signinname')
  async signinName(@Body() body: SigninNameDto) {
    return await this.authService.signInUserViaName(
      body.username,
      body.password,
    );
  }

  @Post('/signinemail')
  async signinEmail(@Body() body: SigninEmailDto) {
    return await this.authService.signInUserViaEmail(body.email, body.password);
  }

  //TODO: Handle re authentication
}
