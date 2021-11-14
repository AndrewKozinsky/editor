import {
    BeforeInsert,
    Column,
    CreateDateColumn,
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

    // JSON со структурой папок и файлов
    @Column({type: 'text'})
    content: string

    // Date when folder was created. It set automatically.
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date


    // Установка времени создания шаблона сайта при создании
    @BeforeInsert()
    async setCreatedAtData() {
        this.createdAt = new Date()
    }
}
