import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('nestjs-examples')
    .setDescription('The nestjs-examples API description')
    .setVersion('1.0')
    .addTag('nestjs-examples')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupSwagger(app)

  await app.listen(3000, '0.0.0.0', async () => {
    console.log(`Application is running on: ${await app.getUrl()}`)
  })
}

bootstrap()
