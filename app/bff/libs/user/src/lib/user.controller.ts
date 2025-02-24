import {UserService} from "./user.service";
import {Body, Controller, Post} from "@nestjs/common";
import {Prisma} from "@prisma/client";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('sign-in')
  signIn(@Body() data: Pick<Prisma.UserCreateInput, 'email' | 'password'>): Promise<{ message: string }> {
    return this.userService.signIn(data);
  }
}
