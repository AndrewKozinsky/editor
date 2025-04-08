import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity({name: 'siteTemplates'})
export class SiteTemplateEntity {
    @PrimaryGeneratedColumn()
    id: number

    // id пользователя, который создал шаблон сайта
    @Column({type: 'integer'})
    userId: number

    // id сайта, к которому относится шаблон сайта
    @Column({type: 'integer'})
    siteId: number

    // JSON с шаблоном сайта
    @Column({type: 'text'})
    content: string

    // Date when site was created. It set automatically.
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date


    // Установка времени создания шаблона сайта при создании
    @BeforeInsert()
    async setCreatedAtData() {
        this.createdAt = new Date()
    }
}
