import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'


export interface ISite extends Document {
    name: string,
    userId: string,
}

const SiteSchema: Schema = new Schema({
    // Название сайта
    name: {
        type: String,
        required: [true, '{{site.nameRequired}}'],
        unique: [true, '{{site.uniqueNameRequired}}'],
    },
    // Почта пользователя
    userId: {
        type: String,
        required: [true, '{{site.userIdRequired}}']
    },
})

const SiteModel = mongoose.model<ISite>('Site', SiteSchema)

export default SiteModel