// Тип ошибочного ответа от сервера
type ErrorServerResponseType = {
    status: 'fail',
    statusCode: number,
    errors?: { [key: string]: string[] } // Messages object with field names and arrays its errors
    commonError?: string // Common message relating to the entire form
}

export default ErrorServerResponseType