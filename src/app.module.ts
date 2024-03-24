import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { KeyService } from './key/key.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, ConfigModule.forRoot(), HttpModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, KeyService,
  {
    provide: 'APP_GUARD',
    useClass: AuthGuard
  }],
})
export class AppModule {}
