import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('comms/your-next-delivery/:userId')
  getNextDelivery(@Param('userId') userId: string) {
    return this.appService.getNextDeliveryMessage(userId);
  }
}
