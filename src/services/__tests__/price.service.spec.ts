import { Test, TestingModule } from '@nestjs/testing';
import { PriceService } from '../price.service';
import { Cat } from '../../dto/welcome-fresh.dto';

describe('PriceService', () => {
  let priceService: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceService],
    }).compile();

    priceService = module.get<PriceService>(PriceService);
  });

  describe('calculateTotalPrice', () => {
    it('should return 0 for empty cats array', () => {
      expect(priceService.calculateTotalPrice([])).toBe(0);
    });

    it('should calculate price for single active cat', () => {
      const cats: Cat[] = [
        { name: 'Whiskers', pouchSize: 'A', subscriptionActive: true, breed: 'Siamese' }
      ];
      expect(priceService.calculateTotalPrice(cats)).toBe(55.50);
    });

    it('should calculate price for multiple active cats', () => {
      const cats: Cat[] = [
        { name: 'Dorian', pouchSize: 'C', subscriptionActive: true, breed: 'Thai' },
        { name: 'Ocie', pouchSize: 'F', subscriptionActive: true, breed: 'Somali' }
      ];
      // C = 62.75, F = 71.25
      expect(priceService.calculateTotalPrice(cats)).toBe(134.00);
    });

    it('should ignore inactive cats in price calculation', () => {
      const cats: Cat[] = [
        { name: 'Whiskers', pouchSize: 'A', subscriptionActive: true, breed: 'Siamese' },
        { name: 'Mittens', pouchSize: 'B', subscriptionActive: false, breed: 'Persian' }
      ];
      expect(priceService.calculateTotalPrice(cats)).toBe(55.50);
    });
  });

  describe('isEligibleForFreeGift', () => {
    it('should return false for price below 120', () => {
      expect(priceService.isEligibleForFreeGift(115.00)).toBe(false);
      expect(priceService.isEligibleForFreeGift(119.99)).toBe(false);
    });

    it('should return true for price above 120', () => {
      expect(priceService.isEligibleForFreeGift(120.01)).toBe(true);
      expect(priceService.isEligibleForFreeGift(134.00)).toBe(true);
    });

    it('should return false for price exactly 120', () => {
      expect(priceService.isEligibleForFreeGift(120.00)).toBe(false);
    });
  });
}); 