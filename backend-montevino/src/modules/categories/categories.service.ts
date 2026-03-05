import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import data from 'data.json';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoriesRepository: Repository<Category>) {}

  async seeder() { 
    const categoryNames: Set<string> = new Set((data as any).map((product: any) => product.category));

    const categoriesArray = Array.from(categoryNames);

    const categories = categoriesArray.map((string) => ({
      name: string,
    }));

    await this.categoriesRepository.upsert(categories, ['name']);

    return 'Categories Added';
  }

  async getCategorie(page: number, limit: number) {
    return await this.categoriesRepository.find({
      relations: { platos: true },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async create(categorieData: CreateCategoryDto) {
    const newCategorie = this.categoriesRepository.create(categorieData);
    return await this.categoriesRepository.save(newCategorie);
  }


}
