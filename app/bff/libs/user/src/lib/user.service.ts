import {Injectable} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../../shared/src/lib/prisma.service";
import * as bcrypt from 'bcrypt';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) {
  }

  async signUp(data: Prisma.UserCreateInput): Promise<{ message: string }> {

    const hashedPassword: string = await bcrypt.hash(data.password, 12);

    try {
      await this.prismaService.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
        }
      });

      return {
        message: 'ok'
      }
    } catch (error: unknown) {
      const prismaError = error as PrismaClientKnownRequestError;
      if (prismaError.code === 'P2002') {
        return {
          message: 'Email already exists'
        }
      }

      // 対応してないエラーはそのままthrow
      return {
        message: 'Internal Server Error'
      }
    }
  }
}
