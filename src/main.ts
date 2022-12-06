import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { AllExceptionFilter, HttpExceptionFilter } from './error'
import { ReportLogger } from './log/ReportLogger'
import { LogInterceptor } from './log/log.interceptor'
import { TransformInterceptor } from './transform/transform.interceptor'

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
  const reportLogger = new ReportLogger()

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:3000'],
      credentials: true
    },
    bufferLogs: true,
    logger: reportLogger
  })

  app.setGlobalPrefix('api')
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter())

  app.useGlobalInterceptors(new LogInterceptor(reportLogger), new TransformInterceptor())

  setupSwagger(app)

  await app.listen(3000, '0.0.0.0', async () => {
    console.log(`Application is running on: ${await app.getUrl()}`)
  })
}

bootstrap()
