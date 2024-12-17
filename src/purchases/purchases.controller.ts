import { Controller, Post, Body } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  async addPurchase(
    @Body() body: { productId: number; quantity: number; totalPrice: number },
  ) {
    const { productId, quantity, totalPrice } = body;
    return this.purchasesService.createPurchase(productId, quantity, totalPrice);
  }
}