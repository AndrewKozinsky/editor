import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompFolderController } from './compFolder.controller'
import { CompFolderService } from './compFolder.service'
import { CompFolderEntity } from './compFolder.entity'
import { AuthGuard } from '../user/guards/auth.guard'

@Module({
    imports: [TypeOrmModule.forFeature([CompFolderEntity])],
    controllers: [CompFolderController],
    providers: [CompFolderService, AuthGuard],
})
export class CompFolderModule {}
