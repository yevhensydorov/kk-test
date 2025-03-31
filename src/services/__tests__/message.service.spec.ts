import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from '../message.service';
import { User } from '../../dto/welcome-fresh.dto';

describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
  });

  describe('generateDeliveryMessage', () => {
    const mockUser: User = {
      id: 'test-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      cats: []
    };

    it('should generate message for single cat', () => {
      const result = messageService.generateDeliveryMessage(
        mockUser,
        ['Whiskers'],
        55.50,
        false
      );

      expect(result).toEqual({
        title: 'Your next delivery for Whiskers',
        message: 'Hey John! In two days\' time, we\'ll be charging you for your next order for Whiskers\'s fresh food.',
        totalPrice: 55.50,
        freeGift: false
      });
    });

    it('should generate message for two cats', () => {
      const result = messageService.generateDeliveryMessage(
        mockUser,
        ['Whiskers', 'Mittens'],
        115.00,
        false
      );

      expect(result).toEqual({
        title: 'Your next delivery for Whiskers and Mittens',
        message: 'Hey John! In two days\' time, we\'ll be charging you for your next order for Whiskers and Mittens\'s fresh food.',
        totalPrice: 115.00,
        freeGift: false
      });
    });

    it('should generate message for three cats', () => {
      const result = messageService.generateDeliveryMessage(
        mockUser,
        ['Whiskers', 'Mittens', 'Felix'],
        134.00,
        true
      );

      expect(result).toEqual({
        title: 'Your next delivery for Whiskers, Mittens and Felix',
        message: 'Hey John! In two days\' time, we\'ll be charging you for your next order for Whiskers, Mittens and Felix\'s fresh food.',
        totalPrice: 134.00,
        freeGift: true
      });
    });

    it('should handle empty cat names array', () => {
      const result = messageService.generateDeliveryMessage(
        mockUser,
        [],
        0,
        false
      );

      expect(result).toEqual({
        title: 'Your next delivery for ',
        message: 'Hey John! In two days\' time, we\'ll be charging you for your next order for \'s fresh food.',
        totalPrice: 0,
        freeGift: false
      });
    });

    it('should handle different user names', () => {
      const result = messageService.generateDeliveryMessage(
        { ...mockUser, firstName: 'Kayleigh' },
        ['Dorian', 'Ocie'],
        134.00,
        true
      );

      expect(result).toEqual({
        title: 'Your next delivery for Dorian and Ocie',
        message: 'Hey Kayleigh! In two days\' time, we\'ll be charging you for your next order for Dorian and Ocie\'s fresh food.',
        totalPrice: 134.00,
        freeGift: true
      });
    });
  });
}); 