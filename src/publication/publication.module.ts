import { Module } from '@nestjs/common';
import {PublicationController} from "./publication.controller";
import {PublicationService} from "./publication.service";
import {UserModule} from "../user/user.module";

@Module({
    providers: [PublicationService],
    controllers: [PublicationController],
    imports: [UserModule]
})
export class PublicationModule {}
