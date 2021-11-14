import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SiteController } from './site.controller'
import { SiteService } from './site.service'
import { SiteEntity } from './site.entity'
import {AuthGuard} from '../user/guards/auth.guard'
import { SiteTemplateService } from '../siteTemplate/siteTemplate.service'
import { ComponentService } from '../component/component.service'
import { SiteTemplateEntity } from '../siteTemplate/siteTemplate.entity'
import { ComponentEntity } from '../component/component.entity'
import { CompFolderService } from '../compFolder/compFolder.service'
import {CompFolderEntity} from '../compFolder/compFolder.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([SiteEntity]),
        TypeOrmModule.forFeature([SiteTemplateEntity]),
        TypeOrmModule.forFeature([CompFolderEntity]),
        TypeOrmModule.forFeature([ComponentEntity]),
    ],
    controllers: [SiteController],
    providers: [
        SiteService,
        AuthGuard,
        SiteTemplateService,
        CompFolderService,
        ComponentService
    ],
    exports: [SiteService]
})
export class SiteModule {}
