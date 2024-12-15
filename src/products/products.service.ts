import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>, // Aquí se inyecta el repositorio
    ) {}

    async getProductById(id: number) {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return data;
    }

    async getAllProducts() {
      const { data } = await axios.get('https://fakestoreapi.com/products');
      return data.map((product) => ({
        ...product,
        stock: Math.floor(Math.random() * 100),
      }));
    }

    async createProduct(productData: Partial<Product>) {
        const product = this.productsRepository.create({ ...productData, stock: 0 });
        return this.productsRepository.save(product);
    }

    async updateStock(id: number, stock: number) {
        await this.productsRepository.update(id, { stock });
        return this.productsRepository.findOneBy({ id });
    }

    async deleteProduct(id: number) {
        return this.productsRepository.delete(id);
    }
  }
