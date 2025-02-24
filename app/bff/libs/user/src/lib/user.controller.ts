import {UserService} from "./user.service";
import {Body, Post} from "@nestjs/common";
import {Prisma} from "@prisma/client";

export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('signup')
  signUp(@Body() data: Pick<Prisma.UserCreateInput, 'email' | 'password'>): Promise<{ message: string }> {
    return this.userService.signUp(data);
  }
}
