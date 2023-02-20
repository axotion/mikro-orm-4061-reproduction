import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Category } from '../ model/category.model';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';

@Injectable()
export class ReproductionService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: EntityRepository<Category>,
    private orm: MikroORM,
  ) {}

  @UseRequestContext()
  async prepareData() {
    const categories = await this.categoryRepository.findAll();
    await this.categoryRepository.removeAndFlush(categories);
    const firstCategory = new Category();
    firstCategory.name = 'TEST1';
    firstCategory.parent = null;
    const secondCategory = new Category();
    secondCategory.name = 'TEST2';
    secondCategory.parent = firstCategory;
    const thirdCategory = new Category();
    thirdCategory.name = 'TEST3';
    thirdCategory.parent = secondCategory;
    await this.categoryRepository.persistAndFlush(firstCategory);
  }

  async execute(): Promise<void> {
    await this.prepareData();

    const firstCategory = await this.categoryRepository.findOne({
      parent: null,
    });

    const firstChild = firstCategory.children.getItems();

    // children: Collection<Category> { initialized: false, dirty: false } on TEST 2 expected initialized: true
    console.log(firstChild);
  }
}
