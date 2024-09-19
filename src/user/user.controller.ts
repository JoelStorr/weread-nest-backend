import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/id/:id')
  async getUserById(@Param('id') id: string) {
    let idNumber = Number(id);

    return await this.userService.findUserById(idNumber);
  }

  @Get('/username/:username')
  async getUserByName(@Param('username') username: string) {
    return await this.userService.findUserByName(username);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }
}
