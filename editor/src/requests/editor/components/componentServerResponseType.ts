
// Успешный ответ от сервера при операциях с компонентами
type ComponentServerResponseType = {
    status: 'success',
    statusCode: number,
    data: {
        components: ComponentType[]
    }
}

export default ComponentServerResponseType


type ComponentType = {
    id: number
    content: string
    createdAt: Date
}


