import {Injectable} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../../shared/src/lib/prisma.service";
import * as bcrypt from 'bcrypt';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) {
  }

  /**
   * ユーザ登録
   * ユーザが存在している場合はsignIn、してない場合は登録をしてからsignInをする
   * @param data
   */
  async signIn(data: Prisma.UserCreateInput): Promise<{ message: string }> {

    const user: Prisma.UserCreateInput | null = await this.prismaService.user.findUnique({
      where: {
        email: data.email
      }
    })

    // ユーザが存在してない場合はsignUpを実行
    if (user === null) {
      return await this.signUp(data);
    }

    // パスワードが一致しているか確認
    const isPasswordMatch: boolean = await bcrypt.compare(data.password, user.password);

    if (isPasswordMatch) {
      return {
        message: 'ok'
      }
    }

    return {
      message: 'Password is incorrect'
    }
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
