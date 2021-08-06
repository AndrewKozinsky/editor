import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm'
import { hash } from 'bcrypt'
import MiscTypes from '../../types/miscTypes'

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', width: 100, default: ''})
    name: string

    @Column({type: 'varchar', width: 100})
    email: string

    @Column({type: 'varchar', width: 250, default: ''})
    emailConfirmToken: string

    @Column({type: 'varchar', width: 250})
    password: string

    @Column({type: 'bigint', default: 0})
    passwordChangedAt: number

    @Column({type: 'varchar', width: 250, default: ''})
    passwordResetToken: string

    @Column({type: 'bigint', default: 0})
    passwordResetExpires: number

    @Column({type: 'char', length: 3, default: 'eng'})
    language: MiscTypes.Language

    // Date when user was created. It set automatically.
    @CreateDateColumn()
    createdAt: number

    // Hash password before create or update user data
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) return
        // Hash password before insert
        this.password = await hash(this.password, 10)
        // Set a new date when the password was changed
        this.passwordChangedAt = +(new Date())
    }

    @BeforeInsert()
    async setCreatedAtData() {
        this.createdAt = +(new Date())
    }
}


