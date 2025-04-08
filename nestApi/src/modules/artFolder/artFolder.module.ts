import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArtFolderController } from './artFolder.controller'
import { ArtFolderService } from './artFolder.service'
import { ArtFolderEntity } from './artFolder.entity'
import { AuthGuard } from '../user/guards/auth.guard'

@Module({
    imports: [TypeOrmModule.forFeature([ArtFolderEntity])],
    controllers: [ArtFolderController],
    providers: [ArtFolderService, AuthGuard],
})
export class ArtFolderModule {}
