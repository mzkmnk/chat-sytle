import {Module} from '@nestjs/common';
import {SharedModule} from "@chat-style/shared";

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {
}
