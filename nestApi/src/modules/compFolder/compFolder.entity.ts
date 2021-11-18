import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity({name: 'compFolders'})
export class CompFolderEntity {
    @PrimaryGeneratedColumn()
    id: number

    // id пользователя, который создал папку с компонентами
    @Column({type: 'integer'})
    userId: number

    // id сайта, к которому относится папка с компонентами
    @Column({type: 'integer'})
    siteId: number

    // JSON со структурой папок и компонентов
    @Column({type: 'text', default: null})
    content: string
}