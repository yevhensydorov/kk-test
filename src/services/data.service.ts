import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../dto/welcome-fresh.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataService {
  private readonly dataPath: string;
  private readonly userData: User[];

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data.json');
    this.userData = this.loadUserData();
  }

  findUser(userId: string): User {
    const user = this.userData.find(u => u.id === userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  private loadUserData(): User[] {
    try {
      const rawData = fs.readFileSync(this.dataPath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading user data:', error);
      throw new Error(`Failed to load data.json from ${this.dataPath}`);
    }
  }
} 