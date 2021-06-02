import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'


export interface IComponentsOrder extends Document {
    userId: string,
    siteId: string,
    content?: any[],
}

// Схема порядка следования шаблонов компонентов
const ComponentsOrderSchema: Schema = new Schema({
    // id пользователя которому принадлежит документ
    // Требуется для удаления всех документов при удалении пользователя
    userId: {
        type: String,
        required: [true, '{{componentsOrderModel.userIdRequired}}']
    },
    // id сайта к которому относится шаблон компонента
    siteId: {
        type: String,
        required: [true, '{{componentsOrderModel.siteIdRequired}}']
    },
    // id пользователя, кому принадлежит сайт с этим шаблоном
    content: {
        type: Array,
    },
})


const ComponentsOrderModel = mongoose.model<IComponentsOrder>('ComponentsOrder', ComponentsOrderSchema)
export default ComponentsOrderModel