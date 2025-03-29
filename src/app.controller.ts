import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { DeliveryParamsDto } from './dto/delivery.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('comms/your-next-delivery/:userId')
  getNextDelivery(@Param(ValidationPipe) params: DeliveryParamsDto) {
    return this.appService.getNextDeliveryMessage(params.userId);
  }
}
