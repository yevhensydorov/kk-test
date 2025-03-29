import { Injectable } from '@nestjs/common';
import { User } from './dto/welcome-fresh.dto';
import { DataService } from './services/data.service';
import { PriceService } from './services/price.service';
import { MessageService } from './services/message.service';

@Injectable()
export class AppService {
  constructor(
    private readonly dataService: DataService,
    private readonly priceService: PriceService,
    private readonly messageService: MessageService,
  ) {}

  getNextDeliveryMessage(userId: string) {
    const user = this.dataService.findUser(userId);
    const activeCats = user.cats.filter(cat => cat.subscriptionActive);
    const activeCatNames = activeCats.map(cat => cat.name);
    const totalPrice = this.priceService.calculateTotalPrice(activeCats);
    const hasFreeGift = this.priceService.isEligibleForFreeGift(totalPrice);

    return this.messageService.generateDeliveryMessage(
      user,
      activeCatNames,
      totalPrice,
      hasFreeGift
    );
  }

  getHello(): string {
    return 'Hello World!';
  }
}
