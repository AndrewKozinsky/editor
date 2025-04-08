import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity({name: 'components'})
export class ComponentEntity {
    @PrimaryGeneratedColumn()
    id: number

    // id пользователя, который создал компонент
    @Column({type: 'integer'})
    userId: number

    // id сайта, к которому относится компонент
    @Column({type: 'integer'})
    siteId: number

    // JSON с шаблоном компонента
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
