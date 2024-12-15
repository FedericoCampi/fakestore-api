import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get(':id')
    getProductById(@Param('id') id: number) {
        return this.productsService.getProductById(id);
    }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Post()
    createProduct(@Body() productData: Partial<Product>) {
        return this.productsService.createProduct(productData);
    }

    @Put(':id/stock')
    updateStock(@Param('id') id: number, @Body('stock') stock: number) {
        return this.productsService.updateStock(id, stock);
    }

    @Delete(':id')
        deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id);
    }

}
