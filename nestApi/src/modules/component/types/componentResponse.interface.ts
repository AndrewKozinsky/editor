
// Тип данных отравляемых клиенту при операциях с сайтом
export interface ComponentResponseInterface {
    status: 'success'
    statusCode: number
    data: {
        components: ComponentType[]
    }
}

type ComponentType = {
    id: number
    content: string
    createdAt: Date
}
