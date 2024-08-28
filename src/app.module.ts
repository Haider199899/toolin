import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './core-modules/auth/auth.controller';
import { AuthModule } from './core-modules/auth/auth.module';
import { StripePaymentService } from './shared/stripe/stripe-service';
import { UserModule } from './core-modules/user/user.module';
import { ToolsModule } from './core-modules/tool/tool.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    AuthModule,
    UserModule,
    ToolsModule
  ],
  controllers: [
    AuthController,
    AppController,
  ],
  providers: [
    StripePaymentService
  ],
})
export class AppModule {}
