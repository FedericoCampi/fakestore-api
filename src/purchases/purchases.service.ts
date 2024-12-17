import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async createPurchase(productId: number, quantity: number, totalPrice: number, name: string): Promise<Purchase> {
    const newPurchase = this.purchaseRepository.create({
      productId,
      quantity,
      totalPrice,
      name
    });
    return await this.purchaseRepository.save(newPurchase);
  }
}