import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { StripePaymentService } from 'src/shared/stripe/stripe-service';
import { UserService } from "../user/user.service";
import { HasingService } from "../../shared/bcrypt/hashing";
import { AuthService } from "../auth/auth.service";
import { ToolService } from "../tool/tool.service";

@Module({
  providers: [BookingService, StripePaymentService,UserService,HasingService,AuthService,ToolService],
  controllers: [BookingController]
})
export class BookingModule {}
