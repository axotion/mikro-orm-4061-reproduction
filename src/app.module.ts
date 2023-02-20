import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mikroOrmConfigFactory } from './config/mikroorm.config';
import { CategoryMigration } from './migration/category.migration';
import { Migrator } from './service/migrator';
import { ReproductionService } from './service/reproduction.service';
import { Category } from './ model/category.model';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return mikroOrmConfigFactory(configService, [
          {
            name: 'category.migration',
            class: CategoryMigration,
          },
        ]);
      },
      inject: [ConfigService],
    }),
    MikroOrmModule.forFeature([Category]),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [ReproductionService, Migrator],
})
export class AppModule {}
