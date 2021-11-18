import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ComponentController } from './component.controller'
import { ComponentService } from './component.service'
import { ComponentEntity } from './component.entity'
import { AuthGuard } from '../user/guards/auth.guard'
import {SiteEntity} from '../site/site.entity'

@Module({
    imports: [TypeOrmModule.forFeature([ComponentEntity, SiteEntity])],
    controllers: [ComponentController],
    providers: [ComponentService, AuthGuard],
})
export class ComponentModule {}
