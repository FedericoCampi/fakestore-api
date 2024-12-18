import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesService } from './purchases.service';
import { Purchase } from './purchase.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PurchasesService', () => {
  let service: PurchasesService;
  let repository: Repository<Purchase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasesService,
        {
          provide: getRepositoryToken(Purchase),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PurchasesService>(PurchasesService);
    repository = module.get<Repository<Purchase>>(getRepositoryToken(Purchase));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPurchase', () => {
    it('should create and save a new purchase', async () => {
      // Datos de entrada
      const productId = 1;
      const quantity = 2;
      const totalPrice = 100;
      const name = 'John Doe';

      // Simulación del resultado esperado
      const mockPurchase = {
        id: 1,
        productId,
        quantity,
        totalPrice,
        name,
        createdAt: new Date(),
      };

      // Configuración del mock del repositorio
      (repository.create as jest.Mock).mockReturnValue(mockPurchase);
      (repository.save as jest.Mock).mockResolvedValue(mockPurchase);

      // Ejecución del método del servicio
      const result = await service.createPurchase(productId, quantity, totalPrice, name);

      // Verificaciones
      expect(repository.create).toHaveBeenCalledWith({
        productId,
        quantity,
        totalPrice,
        name,
      });
      expect(repository.save).toHaveBeenCalledWith(mockPurchase);
      expect(result).toEqual(mockPurchase);
    });
  });
});