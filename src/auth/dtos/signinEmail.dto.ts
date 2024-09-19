import { IsString } from 'class-validator';

export class SigninEmailDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
