import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { StripePaymentService } from 'src/shared/stripe/stripe-service';

@Module({
  providers: [BookingService, StripePaymentService],
  controllers: [BookingController]
})
export class BookingModule {}
