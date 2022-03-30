import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [PublicationService],
  controllers: [PublicationController],
  imports: [UserModule]
})
export class PublicationModule {}
