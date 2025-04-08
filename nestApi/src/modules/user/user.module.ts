import { Module } from '@nestjs/common'
import { SiteModule } from '../site/site.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { AuthGuard } from './guards/auth.guard'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        SiteModule
    ],
    controllers: [UserController],
    providers: [
        UserService,
        AuthGuard,
    ],
    exports: [UserService]
})
export class UserModule {}
