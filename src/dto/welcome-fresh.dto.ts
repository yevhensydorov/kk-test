export type PouchSize = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface Cat {
  name: string;
  pouchSize: PouchSize;
  subscriptionActive: boolean;
  breed: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
} 