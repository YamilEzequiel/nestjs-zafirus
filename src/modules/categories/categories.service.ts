import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    const categories = await this.categoriRepository.find();

    if (!categories.length) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      for (let i = 0; i < 10; i++) {
        const cat = new Category();

        cat.nombre =
          alphabet.charAt(Math.floor(Math.random() * alphabet.length)) +
          '-' +
          Math.random() * 100;
        cat.activa = Math.random() > 0.5;
        cat.descripcion = '----';

        await this.categoriRepository.save(cat);
      }
    }
  }
}
