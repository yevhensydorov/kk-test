import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from '../data.service';
import { User } from '../../dto/welcome-fresh.dto';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('DataService', () => {
  let dataService: DataService;
  const mockData: User[] = [
    {
      id: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      cats: [
        { name: 'Whiskers', pouchSize: 'A', subscriptionActive: true, breed: 'Siamese' }
      ]
    },
    {
      id: 'user2',
      firstName: 'Kayleigh',
      lastName: 'Smith',
      email: 'kayleigh@example.com',
      cats: [
        { name: 'Dorian', pouchSize: 'C', subscriptionActive: true, breed: 'Thai' },
        { name: 'Ocie', pouchSize: 'F', subscriptionActive: true, breed: 'Somali' }
      ]
    }
  ];

  beforeEach(async () => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock fs.readFileSync to return our test data
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));

    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    dataService = module.get<DataService>(DataService);
  });

  describe('findUser', () => {
    it('should find user by ID', () => {
      const user = dataService.findUser('user1');
      expect(user).toEqual(mockData[0]);
    });

    it('should find user with multiple cats', () => {
      const user = dataService.findUser('user2');
      expect(user).toEqual(mockData[1]);
    });

    it('should throw NotFoundException for non-existent user ID', () => {
      expect(() => dataService.findUser('non-existent')).toThrow('User with ID non-existent not found');
    });
  });

  describe('loadUserData', () => {
    it('should load and parse data.json correctly', () => {
      const data = (dataService as any).loadUserData();
      expect(data).toEqual(mockData);
    });

    it('should throw error if data.json cannot be read', () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('File not found');
      });

      expect(() => (dataService as any).loadUserData()).toThrow('Failed to load data.json');
    });

    it('should throw error if data.json contains invalid JSON', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue('invalid json');

      expect(() => (dataService as any).loadUserData()).toThrow();
    });
  });
}); 