import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity({name: 'metaTemplates'})
export class MetaTemplateEntity {
    @PrimaryGeneratedColumn()
    id: number

    // id пользователя, который создал шаблон метаданных
    @Column({type: 'integer'})
    userId: number

    // id сайта, к которому относится шаблон метаданных
    @Column({type: 'integer'})
    siteId: number

    // JSON с шаблоном метаданных
    @Column({type: 'text'})
    content: string

    // Date when meta template was created. It set automatically.
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date


    // Установка времени создания шаблона метаданных при создании
    @BeforeInsert()
    async setCreatedAtData() {
        this.createdAt = new Date()
    }
}
