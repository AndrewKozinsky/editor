import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SiteController } from './site.controller'
import { SiteService } from './site.service'
import { SiteEntity } from './site.entity'
import {AuthGuard} from '../user/guards/auth.guard'
import { SiteTemplateService } from '../siteTemplate/siteTemplate.service'
import {SiteTemplateEntity} from '../siteTemplate/siteTemplate.entity'

@Module({
    imports: [TypeOrmModule.forFeature([SiteEntity]), TypeOrmModule.forFeature([SiteTemplateEntity])],
    controllers: [SiteController],
    providers: [SiteService, AuthGuard, SiteTemplateService],
    exports: [SiteService]
})
export class SiteModule {}
