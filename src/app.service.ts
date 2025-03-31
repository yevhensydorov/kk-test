import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataService } from './services/data.service';
import { PriceService } from './services/price.service';
import { MessageService } from './services/message.service';
import { MessageResponseDto } from './dto/message.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly dataService: DataService,
    private readonly priceService: PriceService,
    private readonly messageService: MessageService,
  ) {}

  getNextDeliveryMessage(userId: string): MessageResponseDto {
    // First validate UUID format
    if (!this.isValidUUID(userId)) {
      throw new BadRequestException('Invalid user ID format. Must be a valid UUID v4.');
    }

    // Then check if user exists
    const user = this.dataService.findUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

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

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
