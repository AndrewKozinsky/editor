import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MetaTemplateController } from './metaTemplate.controller'
import { MetaTemplateService } from './metaTemplate.service'
import { MetaTemplateEntity } from './metaTemplate.entity'
import { AuthGuard } from '../user/guards/auth.guard'
import { SiteEntity } from '../site/site.entity'

@Module({
    imports: [TypeOrmModule.forFeature([MetaTemplateEntity, SiteEntity])],
    controllers: [MetaTemplateController],
    providers: [MetaTemplateService, AuthGuard],
    exports: [MetaTemplateService]
})
export class MetaTemplateModule {}
