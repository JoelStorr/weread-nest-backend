import { IsString } from "class-validator";

export class SigninNameDto{
    @IsString()
    username: string;

    @IsString()
    password: string;
}