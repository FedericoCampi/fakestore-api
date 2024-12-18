import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import axios from 'axios';

jest.mock('axios'); // Mock global de axios

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product), // Mock del repositorio
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProductById', () => {
    it('should return a product from external API', async () => {
      const mockProduct = { id: 1, title: 'Product A', price: 100 };
      (axios.get as jest.Mock).mockResolvedValue({ data: mockProduct });

      const result = await service.getProductById(1);
      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products with added stock', async () => {
      const mockProducts = [
        { id: 1, title: 'Product A', price: 100 },
        { id: 2, title: 'Product B', price: 200 },
      ];
      (axios.get as jest.Mock).mockResolvedValue({ data: mockProducts });

      const result = await service.getAllProducts();
      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('stock');
    });
  });

  describe('createProduct', () => {
    it('should create and save a new product', async () => {
      const productData = { title: 'New Product', price: 50 };
      const savedProduct = { id: 1, ...productData, stock: 0 };

      repository.create = jest.fn().mockReturnValue(savedProduct);
      repository.save = jest.fn().mockResolvedValue(savedProduct);

      const result = await service.createProduct(productData);
      expect(repository.create).toHaveBeenCalledWith({ ...productData, stock: 0 });
      expect(repository.save).toHaveBeenCalledWith(savedProduct);
      expect(result).toEqual(savedProduct);
    });
  });

  describe('updateStock', () => {
    it('should update stock and return updated product', async () => {
      const productId = 1;
      const newStock = 50;
      const updatedProduct = { id: productId, stock: newStock };

      repository.update = jest.fn().mockResolvedValue({ affected: 1 });
      repository.findOneBy = jest.fn().mockResolvedValue(updatedProduct);

      const result = await service.updateStock(productId, newStock);
      expect(repository.update).toHaveBeenCalledWith(productId, { stock: newStock });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: productId });
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return DeleteResult', async () => {
      const productId = 1;
      const deleteResult = { raw: {}, affected: 1 };

      repository.delete = jest.fn().mockResolvedValue(deleteResult);

      const result = await service.deleteProduct(productId);
      expect(repository.delete).toHaveBeenCalledWith(productId);
      expect(result).toEqual(deleteResult);
    });
  });
});