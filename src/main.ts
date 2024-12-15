import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('FakeStore API')
    .setDescription('API para gestionar productos del catálogo')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta donde estará la documentación (e.g., http://localhost:3000/api)

  // Inicia la aplicación en el puerto especificado
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();