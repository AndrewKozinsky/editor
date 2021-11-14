import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ComponentController } from './component.controller'
import { ComponentService } from './component.service'
import { ComponentEntity } from './component.entity'
import { AuthGuard } from '../user/guards/auth.guard'

@Module({
    imports: [TypeOrmModule.forFeature([ComponentEntity])],
    controllers: [ComponentController],
    providers: [ComponentService, AuthGuard],
    // exports: [CompFolderService] // Нужно ли его экспортировать?
})
export class ComponentModule {}
