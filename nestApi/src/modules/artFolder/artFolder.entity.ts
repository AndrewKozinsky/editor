import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity({name: 'artFolders'})
export class ArtFolderEntity {
    @PrimaryGeneratedColumn()
    id: number

    // id пользователя, который создал папку со статьями
    @Column({type: 'integer'})
    userId: number

    // id сайта, к которому относится папка со статьями
    @Column({type: 'integer'})
    siteId: number

    // JSON со структурой папок и статей
    @Column({type: 'text', default: null})
    content: string
}
