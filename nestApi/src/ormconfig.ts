import { ConnectionOptions } from 'typeorm'

// Не комментируй файл потому что что после раскомментирования ломается entities и migrations
const config: ConnectionOptions = {
    type: 'postgres',
    host: 'editor-postgres',
    port: 5432,
    username: 'editor',
    password: 'dt52posQP00P',
    database: 'editor',
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations'
    }
}

export default config