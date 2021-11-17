import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity({name: 'articles'})
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number

    // id пользователя, который создал статья
    @Column({type: 'integer'})
    userId: number

    // id сайта, к которому относится статья
    @Column({type: 'integer'})
    siteId: number

    // Название статьи
    @Column({type: 'varchar', width: 255})
    name: string

    // Содержимое статьи
    @Column({type: 'text'})
    content: string

    // id шаблона сайта
    @Column({type: 'integer', default: null})
    siteTemplateId: number

    // Date when an article was created. It set automatically.
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date


    // Установка времени создания шаблона сайта при создании
    @BeforeInsert()
    async setCreatedAtData() {
        this.createdAt = new Date()
    }
}
