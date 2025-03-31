import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { DataService } from '../../services/data.service';
import { PriceService } from '../../services/price.service';
import { MessageService } from '../../services/message.service';
import { ValidationPipe, ValidationError } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let validationPipe: ValidationPipe;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, DataService, PriceService, MessageService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(error => Object.values(error.constraints || {})).flat();
        throw new Error(messages[0]);
      }
    });
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getNextDelivery', () => {
    it('should return delivery message for valid user ID', () => {
      const param = 'ff535484-6880-4653-b06e-89983ecf4ed5';
      const result = appController.getNextDelivery(param);
      
      expect(result).toEqual({
        title: 'Your next delivery for Dorian and Ocie',
        message: 'Hey Kayleigh! In two days\' time, we\'ll be charging you for your next order for Dorian and Ocie\'s fresh food.',
        totalPrice: 134,
        freeGift: true
      });
    });

    it('should throw NotFoundException for non-existent user ID', () => {
      const param = 'ff535484-6880-4653-b06e-89983ecf4ed6';
      expect(() => appController.getNextDelivery(param)).toThrow('User with ID ff535484-6880-4653-b06e-89983ecf4ed6 not found');
    });

    it('should throw BadRequestException for invalid UUID format', async () => {
      const params = 'invalid-id';
      expect(() => appController.getNextDelivery(params)).toThrow('Invalid user ID format. Must be a valid UUID v4.');
    });
  });
});
