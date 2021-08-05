import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './modules/app.module'
import { config } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.setGlobalPrefix('api2')
  await app.listen(config.port)
}
bootstrap()