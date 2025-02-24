import {Module} from '@nestjs/common';
import {SharedModule} from "@chat-style/shared";
import {JwtModule} from "@nestjs/jwt";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [SharedModule, JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, ConfigService],
  exports: [],
})
export class UserModule {
}
