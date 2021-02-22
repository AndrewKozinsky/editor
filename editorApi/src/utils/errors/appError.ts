export class AppError {
    statusCode?: number
    status: string
    isOperational: boolean
    message: string

    constructor(message: string, statusCode?: number) {
        this.statusCode = statusCode || 500
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true
        this.message = message
    }
}