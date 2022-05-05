import { ConnectionOptions } from 'typeorm'

// Не комментируй файл потому что после раскомментирования ломается entities и migrations
const config_serv: ConnectionOptions = {
    type: 'postgres',
    host: '194.93.0.199',
    port: 4000,
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

export default config_serv