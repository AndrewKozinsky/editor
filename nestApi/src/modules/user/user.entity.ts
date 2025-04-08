import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'
import MiscTypes from '../../types/miscTypes'
import { getHash } from '../../utils/miscUtils'

@Entity({name: 'users'})
export class UserEntity {
    // id пользователя
    @PrimaryGeneratedColumn()
    id: number

    // Имя пользователя
    @Column({type: 'varchar', width: 100, default: ''})
    name: string

    // Почта пользователя
    @Column({type: 'varchar', width: 100})
    email: string

    // Токен подтверждения почты если она не подтверждена или null если подтверждена
    @Column({type: 'varchar', width: 250, default: ''})
    emailConfirmToken: string

    // Пароль пользователя
    @Column({type: 'varchar', width: 250})
    password: string

    // Когда пароль был изменён
    @Column({type: 'timestamp'})
    passwordChangedAt: Date

    // Токен сброса пароля если запросили сброс или null если уже сбросили
    @Column({type: 'varchar', width: 250, default: ''})
    passwordResetToken: string

    // Когда заканчивается действие токена сбороса пароля
    @Column({type: 'timestamp', nullable: true})
    passwordResetExpires: Date

    // Язык пользователя
    @Column({type: 'char', length: 3, default: 'eng'})
    language: MiscTypes.Language

    // Date when user was created. It set automatically.
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date

    // Hash password before create or update user data
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) return

        // Hash password before insert
        this.password = getHash(this.password)

        // Set a new date when the password was changed
        this.passwordChangedAt = new Date()
    }

    @BeforeInsert()
    async setCreatedAtData() {
        this.createdAt = new Date()
    }
}
