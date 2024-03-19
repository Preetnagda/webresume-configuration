import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { KeyService } from './key/key.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService, KeyService],
})
export class AppModule {}
