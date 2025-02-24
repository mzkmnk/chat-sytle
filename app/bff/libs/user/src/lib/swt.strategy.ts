import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../../shared/src/lib/prisma.service";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class SwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')!,
    });
  }

  async validate(payload: { sub: number, email: string }) {

    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      }
    })

    return user;
  }
}
