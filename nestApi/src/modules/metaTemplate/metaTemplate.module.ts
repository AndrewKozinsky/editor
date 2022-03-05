import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SiteModule } from '../site/site.module'
import { MetaTemplateController } from './metaTemplate.controller'
import { MetaTemplateService } from './metaTemplate.service'
import { MetaTemplateEntity } from './metaTemplate.entity'
import { AuthGuard } from '../user/guards/auth.guard'
import { SiteEntity } from '../site/site.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([MetaTemplateEntity, SiteEntity]),
        SiteModule
    ],
    controllers: [MetaTemplateController],
    providers: [MetaTemplateService, AuthGuard],
    exports: [MetaTemplateService]
})
export class MetaTemplateModule {}
