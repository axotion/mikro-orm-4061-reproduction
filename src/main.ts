import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ReproductionService } from './service/reproduction.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init();

  const reproductionService = app.get<ReproductionService>(ReproductionService);
  await reproductionService.execute();
}
bootstrap();
