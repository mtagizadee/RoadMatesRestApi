import {Global, Module} from '@nestjs/common';
import { MailService } from './mail.service';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Global()
@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.MAIL_TRANSPORT,
        defaults: { from: process.env.MAIL_FROM },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        }
      })
    })
  ],
  exports: [MailService]
})
export class MailModule {}