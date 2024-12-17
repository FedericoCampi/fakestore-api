import { Controller, Post, Body } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  async addPurchase(
    @Body() body: { productId: number; quantity: number; name: string; totalPrice: number },
  ) {
    const { productId, quantity, totalPrice, name } = body;
    return this.purchasesService.createPurchase(productId, quantity, totalPrice, name);
  }
}