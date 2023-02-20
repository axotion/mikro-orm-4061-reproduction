import { LoadStrategy, MigrationObject } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Category } from '../ model/category.model';

export const mikroOrmConfigFactory = (
  configService: ConfigService,
  migrations: MigrationObject[],
) => {
  const dbLogger = new Logger('MikroORM');
  const options: MikroOrmModuleOptions = {
    entities: [Category],
    host: configService.get('DB_HOST'),
    dbName: configService.get('DB_NAME'),
    user: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    port: configService.get('DB_PORT'),
    allowGlobalContext: true,
    debug: true,
    type: 'mysql',
    cache: {
      enabled: false,
    },
    timezone: configService.get('DB_TIMEZONE'),
    logger: dbLogger.log.bind(dbLogger),
    migrations: {
      dropTables: true,
      allOrNothing: true,
      migrationsList: migrations,
    },
    registerRequestContext: true,
    loadStrategy: LoadStrategy.JOINED,
  };
  return options;
};
