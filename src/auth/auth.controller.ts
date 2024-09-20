import {
  Body,
  Controller,
  Post,
  Session,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { SigninNameDto } from './dtos/signinName.dto';
import { SigninEmailDto } from './dtos/signinEmail.dto';
import { AuthGuard } from './auth.guards';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  async signup(@Body() body: RegisterDto, @Session() session: any) {
    const token = await this.authService.createUser(
      body.username,
      body.email,
      body.password,
    );

    return token;
  }

  @Public()
  @Post('/signinname')
  async signinName(@Body() body: SigninNameDto, @Session() session: any) {
    const token = await this.authService.signInUserViaName(
      body.username,
      body.password,
    );

    return token;
  }

  @Public()
  @Post('/signinemail')
  async signinEmail(@Body() body: SigninEmailDto, @Session() session: any) {
    const token = await this.authService.signInUserViaEmail(
      body.email,
      body.password,
    );

    return token;
  }

  @Get('/whoami')
  whoAmI(@Request() req) {
    return req.user;
  }
}
