import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
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
    @Column({type: 'text', default: null})
    content: string

    // id шаблона сайта
    @Column({type: 'integer', default: null})
    siteTemplateId: number

    // id шаблона метаданных
    @Column({type: 'integer', default: null})
    metaTemplateId: number

    // JSON объекта с метаданными статьи
    @Column({type: 'text', default: null})
    meta: string

    // Date when an article was created. It set automatically.
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date

    // Дата когда статья была обновлена. Проставляется автоматически.
    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date


    // Установка времени создания статьи сайта при создании
    @BeforeInsert()
    async setCreatedAtData() {
        this.createdAt = new Date()
    }

    // Установка времени обновления статьи
    @BeforeUpdate()
    async setUpdatedAtData() {
        this.updatedAt = new Date()
    }
}
