import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  setupSwagger(app);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Unconscious Online backend running on http://localhost:${port}`);
  console.log(`Swagger UI at http://localhost:${port}/api`);
}
bootstrap();
