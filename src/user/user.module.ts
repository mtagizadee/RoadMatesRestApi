import {Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {ProfileModule} from "../profile/profile.module";

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [ProfileModule]
})
export class UserModule {}
