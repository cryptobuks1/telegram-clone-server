import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DialogModule } from './dialog/dialog.module';
import { MessageModule } from './message/message.module';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DialogModule,
    MessageModule,

    TypeOrmModule.forRoot(),

    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),
  ],
})
export class AppModule {
}
