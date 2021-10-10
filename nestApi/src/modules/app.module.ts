import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { join } from 'path'
import { UserModule } from './user/user.module'
import { SiteModule } from './site/site.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import ormconfig from '../ormconfig'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthMiddleware } from './user/middlewares/auth.middleware'
import { LanguageMiddleware } from './user/middlewares/language.middleware'


@Module({
  imports: [
      TypeOrmModule.forRoot(ormconfig),
      ServeStaticModule.forRoot({
          // String is pointing to /app/src/staticFiles
          rootPath: join(__dirname, '../../src', 'staticFiles'),
          renderPath: 'wildcard'
      }),
      UserModule,
      SiteModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LanguageMiddleware, AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        })
    }
}
