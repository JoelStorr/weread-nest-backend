import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UserService } from 'src/user/user.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(username: string, email: string, password: string) {
    //TODO: Hash the users password

    // Hashing the user password

    //Generate Salt
    const salt = randomBytes(8).toString('hex');

    //Hash salted password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const hashedAndSalted = salt + '.' + hash.toString('hex');

    const userId = await this.userService.createUser(
      username,
      email,
      hashedAndSalted,
    );

    const user = await this.userService.findUserById(userId);

     const payload = { sub: user.id, username: user.username };

     return {
       access_token: await this.jwtService.signAsync(payload),
     };
  }

  async signInUserViaName(username: string, password: string) {
    username = username.toLowerCase();

    const user = await this.userService.findUserByName(username);

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong Password');
    }

    //NOTE: First signin Function that works based on JWT Token authentication
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInUserViaEmail(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong Password');
    }

     const payload = { sub: user.id, username: user.username };

     return {
       access_token: await this.jwtService.signAsync(payload),
     };
  }
}
