import { Injectable } from '@nestjs/common';
import { Cat, PouchSize } from '../dto/welcome-fresh.dto';

@Injectable()
export class PriceService {
  private readonly pouchPrices: Record<PouchSize, number> = {
    'A': 55.50,
    'B': 59.50,
    'C': 62.75,
    'D': 66.00,
    'E': 69.00,
    'F': 71.25
  };

  calculateTotalPrice(cats: Cat[]): number {
    return cats
      .filter(cat => cat.subscriptionActive)
      .reduce((sum, cat: Cat) => sum + this.pouchPrices[cat.pouchSize], 0);
  }

  isEligibleForFreeGift(totalPrice: number): boolean {
    return totalPrice > 120;
  }
} 