import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {PrismaModule} from "../prisma/prisma.module";
import {UserModule} from "../user/user.module";
import {AuthModule} from "../auth/auth.module";
import {MailModule} from "../mail/mail.module";
import {ProfileModule} from "../profile/profile.module";
import {PublicationModule} from "../publication/publication.module";
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env'
      }),
      PrismaModule, MailModule,
      AuthModule, UserModule,
      ProfileModule, PublicationModule,
      LikeModule
  ]
})
export class AppModule {}
