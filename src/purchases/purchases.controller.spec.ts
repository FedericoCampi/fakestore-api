import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

describe('PurchasesController', () => {
  let controller: PurchasesController;
  let service: PurchasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasesController],
      providers: [
        {
          provide: PurchasesService,
          useValue: {
            createPurchase: jest.fn(), // Mock del método createPurchase
          },
        },
      ],
    }).compile();

    controller = module.get<PurchasesController>(PurchasesController);
    service = module.get<PurchasesService>(PurchasesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addPurchase', () => {
    it('should call service.createPurchase with the correct parameters', async () => {
      const purchaseDto = {
        productId: 1,
        quantity: 2,
        name: 'John Doe',
        totalPrice: 100,
      };

      const mockResult = { id: 1, ...purchaseDto }; // Resultado esperado del servicio
      jest.spyOn(service, 'createPurchase').mockResolvedValue(mockResult);

      const result = await controller.addPurchase(purchaseDto);

      expect(service.createPurchase).toHaveBeenCalledWith(
        purchaseDto.productId,
        purchaseDto.quantity,
        purchaseDto.totalPrice,
        purchaseDto.name,
      );
      expect(result).toEqual(mockResult);
    });
  });
});