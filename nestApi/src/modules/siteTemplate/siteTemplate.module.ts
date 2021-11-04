import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SiteTemplateController } from './siteTemplate.controller'
import { SiteTemplateService } from './siteTemplate.service'
import { SiteTemplateEntity } from './siteTemplate.entity'
import { AuthGuard } from '../user/guards/auth.guard'

@Module({
    imports: [TypeOrmModule.forFeature([SiteTemplateEntity])],
    controllers: [SiteTemplateController],
    providers: [SiteTemplateService, AuthGuard],
    exports: [SiteTemplateService]
})
export class SiteTemplateModule {}
