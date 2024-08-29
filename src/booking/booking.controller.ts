import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    try {
      return await this.bookingService.createBooking(createBookingDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('payment')
  @ApiOperation({ summary: 'Process payment for a booking' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    try {
      return await this.bookingService.processPayment(processPaymentDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
