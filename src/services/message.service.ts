import { Injectable } from '@nestjs/common';
import { User } from '../dto/welcome-fresh.dto';
import { StringUtils } from '../utils/string.utils';

@Injectable()
export class MessageService {
  generateDeliveryMessage(user: User, activeCatNames: string[], totalPrice: number, hasFreeGift: boolean) {
    const formattedCatNames = StringUtils.formatNames(activeCatNames);
    
    return {
      title: `Your next delivery for ${formattedCatNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatNames}'s fresh food.`,
      totalPrice: totalPrice,
      freeGift: hasFreeGift
    };
  }
} 