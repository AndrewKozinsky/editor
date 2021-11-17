import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { ArticleEntity } from './article.entity'
import { AuthGuard } from '../user/guards/auth.guard'
import {SiteEntity} from '../site/site.entity'
import {SiteTemplateEntity} from '../siteTemplate/siteTemplate.entity'

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, SiteEntity, SiteTemplateEntity])],
    controllers: [ArticleController],
    providers: [ArticleService, AuthGuard],
})
export class ArticleModule {}
