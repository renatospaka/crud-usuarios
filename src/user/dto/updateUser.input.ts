import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio. Por favor informe um nome válido.' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O email não pode ser vazio. Por favor informe um email válido.' })
  @IsOptional()
  email?: string;
};
