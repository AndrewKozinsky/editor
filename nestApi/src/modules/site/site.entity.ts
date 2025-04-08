import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity({name: 'sites'})
export class SiteEntity {
    @PrimaryGeneratedColumn()
    id: number

    // Название сайта
    @Column({type: 'varchar', width: 255})
    name: string

    // id пользователя, который создал сайт
    @Column({type: 'integer'})
    userId: number

    // id шаблона сайта по умолчанию
    @Column({type: 'integer', default: null})
    defaultSiteTemplateId: number

    // id шаблона метаданных по умолчанию
    @Column({type: 'integer', default: null})
    defaultMetaTemplateId: number

    // Date when site was created. It set automatically.
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date


    // Установка времени создания сайта при создании
    @BeforeInsert()
    async setCreatedAtData() {
        this.createdAt = new Date()
    }
}
