import { Body, Controller, Post, Session, Get, Request, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { SigninNameDto } from './dtos/signinName.dto';
import { SigninEmailDto } from './dtos/signinEmail.dto';
import { AuthGuard } from './auth.guards';
import { Public } from 'src/decorators/public.decorator';



@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,    
  ) {}

  @Post('/register')
  async signup(@Body() body: RegisterDto, @Session() session: any) {
    const user = await this.authService.createUser(
      body.username,
      body.email,
      body.password,
    );

    session.userId = user.id;
    console.log(user);
    return user;
  }

  //TODO: Build interceptor to remove password from return data
  @Public()
  @Post('/signinname')
  async signinName(@Body() body: SigninNameDto, @Session() session: any) {
    const user = await this.authService.signInUserViaName(
      body.username,
      body.password,
    );

    // NOTE: Right now returns just the token
    return user;
    
  }

  @Post('/signinemail')
  async signinEmail(@Body() body: SigninEmailDto, @Session() session: any) {
    const user = await this.authService.signInUserViaEmail(
      body.email,
      body.password,
    );

    session.userId = user.id;

    return user;
  }

  @Post("/signout")
  signOut(@Session() session:any){
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @Get("/whoami")
  whoAmI(@Request() req){
    return req.user;
  }
}
