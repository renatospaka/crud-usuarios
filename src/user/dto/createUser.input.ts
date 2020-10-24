import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio. Por favor informe um nome válido.' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O email não pode ser vazio. Por favor informe um email válido.' })
  email: string;
};
