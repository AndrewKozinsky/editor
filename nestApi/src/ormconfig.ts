import {TypeOrmModuleOptions} from '@nestjs/typeorm'

const isCompiled = __filename.endsWith('.js');

export default {
    type: 'postgres',
    host: 'editor-postgres',
    port: 5432,
    username: 'editor',
    password: 'dt52posQP00P',
    database: 'editor',
    entities: [isCompiled ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
    migrations: [isCompiled ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
    synchronize: false,
} as TypeOrmModuleOptions