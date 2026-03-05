import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('seeder')
  seeder() {
    return this.categoriesService.seeder();
  }

  @Get()
  getCategorie(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.categoriesService.getCategorie(page, limit);
  }

  @ApiBearerAuth() 
  @Post()
  // @Roles('admin')
  // @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }
}
