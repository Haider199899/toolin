import { Module } from '@nestjs/common';
import { ToolController } from '../tool/tool.controller';
import { ToolService } from './tool.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { HasingService } from '../../shared/bcrypt/hashing';
import { StripePaymentService } from '../../shared/stripe/stripe-service';

@Module({
  controllers: [ToolController],
  providers: [
    ToolService,
    AuthService,
    UserService,
    HasingService,
    StripePaymentService,
  ],
})
export class ToolsModule {}
