import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../../shared/src/lib/prisma.service";
import * as bcrypt from 'bcrypt';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
  }

  /**
   * ユーザ登録
   * ユーザが存在している場合はsignIn、してない場合は登録をしてからsignInをする
   * @param data
   */
  async signIn(data: Prisma.UserCreateInput) {

    const user = await this.prismaService.user.findUnique({
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
      return await this.generateJwt(user.id, user.email);
    }

    throw new UnauthorizedException();
  }

  /**
   * ユーザ登録
   * @param data
   */
  async signUp(data: Prisma.UserCreateInput) {
    const hashedPassword: string = await bcrypt.hash(data.password, 12);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
        }
      });

      return await this.generateJwt(user.id, user.email);
    } catch (error: unknown) {
      const prismaError = error as PrismaClientKnownRequestError;

      if (prismaError.code === 'P2002') {
        throw new UnauthorizedException('User already exists');
      }

      throw new UnauthorizedException();
    }
  }

  /** JWTを生成する */
  async generateJwt(userId: number, email: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email: email
    }

    const secret: string = this.configService.get('JWT_SECRET')!;

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: '1h'
    })

    return {
      accessToken
    }
  }
}
