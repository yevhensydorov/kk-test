import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataService } from './services/data.service';
import { PriceService } from './services/price.service';
import { MessageService } from './services/message.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DataService, PriceService, MessageService],
})
export class AppModule {}
