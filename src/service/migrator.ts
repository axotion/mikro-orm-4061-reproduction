import { MikroORM } from '@mikro-orm/core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class Migrator implements OnApplicationBootstrap {
  constructor(private readonly orm: MikroORM) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.orm.getMigrator().up();
  }
}
