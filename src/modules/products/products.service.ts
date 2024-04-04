import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productRepository.save(createProductDto);
      return newProduct;
    } catch (error) {
      throw new HttpException(
        'Error al crear el producto: ' + error.message,
        404,
      );
    }
  }

  async findAll(take: number = 1000, skip: number = 0) {
    return await this.productRepository.find({ take, skip: skip * take });
  }

  async activeCategory() {
    const activeCategories = await this.categoryRepository.find({
      where: { activa: true },
    });

    const ids = activeCategories.map((category) => category.id);

    const products = await this.productRepository.find({
      where: { categoria: In(ids) },
      relations: ['categoria'],
    });

    if (!products.length) {
      throw new HttpException(`No se encontraron datos`, 404);
    }

    return products;
  }

  async selectSizes() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.talle = :medium OR product.talle = :large', {
        medium: 'MEDIUM',
        large: 'LARGE',
      })
      .getMany();

    if (!products.length) {
      throw new HttpException(`No se encontraron datos`, 404);
    }

    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException(`No se encontraron datos`, 404);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    try {
      const update = await this.productRepository.update(
        { id },
        { ...updateProductDto },
      );
      return update;
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el producto: ' + error.message,
        404,
      );
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.productRepository.delete({ id });
  }
}
