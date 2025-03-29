import { IsUUID } from 'class-validator';

export class DeliveryParamsDto {
  @IsUUID('4', { message: 'Invalid user ID format. Must be a valid UUID v4.' })
  userId!: string;
} 