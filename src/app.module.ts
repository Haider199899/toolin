import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './core-modules/auth/auth.controller';
import { AuthModule } from './core-modules/auth/auth.module';
import { StripePaymentService } from './shared/stripe/stripe-service';
import { UserModule } from './core-modules/user/user.module';
import { ToolsModule } from './core-modules/tool/tool.module';
import { BookingModule } from './booking/booking.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    UserModule,
    ToolsModule,
    //BookingModule
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
