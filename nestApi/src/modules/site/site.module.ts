import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SiteController } from './site.controller'
import { SiteService } from './site.service'
import { SiteEntity } from './site.entity'
import {AuthGuard} from '../user/guards/auth.guard'
import { SiteTemplateService } from '../siteTemplate/siteTemplate.service'
import { MetaTemplateService } from '../metaTemplate/metaTemplate.service'
import { ComponentService } from '../component/component.service'
import { SiteTemplateEntity } from '../siteTemplate/siteTemplate.entity'
import { MetaTemplateEntity } from '../metaTemplate/metaTemplate.entity'
import { ComponentEntity } from '../component/component.entity'
import { CompFolderService } from '../compFolder/compFolder.service'
import {CompFolderEntity} from '../compFolder/compFolder.entity'
import { ArtFolderService } from '../artFolder/artFolder.service'
import { ArtFolderEntity } from '../artFolder/artFolder.entity'
import { ArticleEntity } from '../article/article.entity'
import {ArticleService} from '../article/article.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SiteEntity,
            SiteTemplateEntity,
            MetaTemplateEntity,
            CompFolderEntity,
            ComponentEntity,
            ArtFolderEntity,
            ArticleEntity
        ]),
    ],
    controllers: [SiteController],
    providers: [
        SiteService,
        AuthGuard,
        SiteTemplateService,
        MetaTemplateService,
        CompFolderService,
        ComponentService,
        ArtFolderService,
        ArticleService
    ],
    exports: [SiteService]
})
export class SiteModule {}
