import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

export interface Version {
  version: string;
}
@ApiTags('health')
@Controller("health")
export class AppController {
  constructor() {}
  @Get("version")
  getHealthVersion(): Version {
    return { version: "0.1" };
  }
}
