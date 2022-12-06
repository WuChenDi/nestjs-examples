import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('nestjs-examples')
    .setDescription('The nestjs-examples API description')
    .setVersion('1.0')
    .addTag('nestjs-examples')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000, '0.0.0.0', async () => {
    console.log(`Application is running on: ${await app.getUrl()}`)
  })
}

bootstrap()
