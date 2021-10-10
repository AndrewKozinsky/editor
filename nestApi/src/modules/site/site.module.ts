import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SiteController } from './site.controller'
import { SiteService } from './site.service'
import { SiteEntity } from './site.entity'
import {AuthGuard} from '../user/guards/auth.guard'

@Module({
    imports: [TypeOrmModule.forFeature([SiteEntity])],
    controllers: [SiteController],
    providers: [SiteService, AuthGuard],
    exports: [SiteService]
})
export class SiteModule {}
