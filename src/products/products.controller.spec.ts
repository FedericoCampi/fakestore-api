import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
            createProduct: jest.fn(),
            updateStock: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProductById', () => {
    it('should call service.getProductById and return the result', async () => {
      const productId = 1;
      const mockProduct = { id: productId, name: 'Product A', stock: 10 };
      jest.spyOn(service, 'getProductById').mockResolvedValue(mockProduct);

      const result = await controller.getProductById(productId);
      expect(service.getProductById).toHaveBeenCalledWith(productId);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('getAllProducts', () => {
    it('should call service.getAllProducts and return the result', async () => {
      const mockProducts = [{ id: 1, title: 'Product A' }, { id: 2, title: 'Product B' }];
      jest.spyOn(service, 'getAllProducts').mockResolvedValue(mockProducts);

      const result = await controller.getAllProducts();
      expect(service.getAllProducts).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('createProduct', () => {
    it('should call service.createProduct with product data and return the result', async () => {
      const productData: Partial<Product> = { title: 'New Product', stock: 5 };
      const mockProduct = { id: 1, ...productData };
      jest.spyOn(service, 'createProduct').mockResolvedValue(mockProduct);

      const result = await controller.createProduct(productData);
      expect(service.createProduct).toHaveBeenCalledWith(productData);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('updateStock', () => {
    it('should call service.updateStock with id and stock value', async () => {
      const productId = 1;
      const newStock = 20;
      const mockResult = { id: productId, stock: newStock };
      jest.spyOn(service, 'updateStock').mockResolvedValue(mockResult);

      const result = await controller.updateStock(productId, newStock);
      expect(service.updateStock).toHaveBeenCalledWith(productId, newStock);
      expect(result).toEqual(mockResult);
    });
  });

  describe('deleteProduct', () => {
    it('should call service.deleteProduct with the given id and return DeleteResult', async () => {
      const productId = 1;
      const mockDeleteResult = { raw: {}, affected: 1 }; // Simulación de DeleteResult
  
      jest.spyOn(service, 'deleteProduct').mockResolvedValue(mockDeleteResult);
  
      const result = await controller.deleteProduct(productId);
  
      expect(service.deleteProduct).toHaveBeenCalledWith(productId);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});