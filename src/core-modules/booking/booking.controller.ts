import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @Post('payment')
  @ApiOperation({ summary: 'Process payment for multiple orders' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  async processPayment(
    @Body() processPaymentDto: ProcessPaymentDto,
  ) {
    try {
      return await this.bookingService.processPayment( processPaymentDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
