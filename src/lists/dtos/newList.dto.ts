import { IsBoolean, IsString } from "class-validator";


export class newListDto {
    @IsString()
    name: string;

    // NOTE: Htink about if we want to have this optional or not
    @IsBoolean()
    privateList: boolean;
}