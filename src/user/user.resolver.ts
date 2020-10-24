import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor (
    private userService: UserService
  ) {}
  
  @Query(() => [User])
  async users(): Promise<User[]> {
    const allUsers = await this.userService.findAllUsers();
    return allUsers;
  } 

  @Mutation(() => User)
  async createUser(
    @Args('data') data: CreateUserInput 
  ): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }
}
