import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'


export interface IIncludedFilesTemplate extends Document {
    name: string,
    userId: string,
    siteId: string,
    codeInHead?: {
        code?: string
    },
    codeBeforeEndBody?: {
        code?: string
    },
}

// Схема о подключаемых к сайту файлах CSS, JS и так далее
const IncludedFilesTemplateSchema: Schema = new Schema({
    // Название шаблона
    name: {
        type: String,
        required: [true, '{{includedFilesTemplate.nameRequired}}'],
        maxLength: [250, '{{includedFilesTemplate.nameMaxLength}}'],
    },
    // id пользователя, кому принадлежит сайт с этим шаблоном
    userId: {
        type: String,
        required: [true, '{{includedFilesTemplate.userIdRequired}}']
    },
    // id сайта шаблона
    siteId: {
        type: String,
        required: [true, '{{includedFilesTemplate.siteIdRequired}}']
    },
    // Объект с кодом, который нужно подключать в <head>
    codeInHead: {
        // Код, который нужно поместить в <head>
        code: {
            type: String,
            maxLength: [65000, '{{includedFilesTemplate.codeInHeadCodeMaxLength}}'],
        },

    },
    // Объект с кодом, который нужно подключать в <head>
    codeBeforeEndBody: {
        // Код, который нужно поместить перед </body>
        code: {
            type: String,
            maxLength: [65000, '{{includedFilesTemplate.codeBeforeEndBodyCodeMaxLength}}'],
        },
    },
})


const IncludedFilesTemplateModel = mongoose.model<IIncludedFilesTemplate>('IncludedFilesTemplate', IncludedFilesTemplateSchema)
export default IncludedFilesTemplateModel