import {Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy";
import {ProfileModule} from "../profile/profile.module";

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [UserModule, ProfileModule ,JwtModule.register({})]
})
export class AuthModule {}