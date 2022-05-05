import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendConfirmationMail(params: {
        receiver: {
            nickname: string,
            email: string
        },
        content: string,
        template: string
    }) {
        await this.mailerService.sendMail({
            to: params.receiver.email,
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            subject: 'RoadMates!',
            template: params.template,
            context: {
                nickname: params.receiver.nickname,
                content: params.content
            }
        });
    }

}
