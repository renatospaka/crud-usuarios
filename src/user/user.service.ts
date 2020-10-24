import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Não foi possível salvar o usuário.')
    }

    return userSaved;
  }

  async updateUser(id: string, data:UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id);
    
    await this.userRepository.update(user, { ...data });
    const userUpdated = this.userRepository.create({ ...user, ...data });
    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);
    const deleted = await this.userRepository.delete(user);
    if (deleted) {
      return true;
    } else {
      return false;
    }
  }
}
