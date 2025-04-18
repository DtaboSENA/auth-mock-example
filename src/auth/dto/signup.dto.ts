import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;
}
