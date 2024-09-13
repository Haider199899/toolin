import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export interface Version {
  version: string;
}
@ApiTags('health')
@Controller('health')
export class AppController {
  constructor() {}
  @Get()
  getHello(): Version {
    return { version: 'Welcome to Toolin app!' };
  }

  @Get('version')
  getHealthVersion(): Version {
    return { version: '0.1' };
  }
}
