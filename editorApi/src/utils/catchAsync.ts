import {Request, Response, NextFunction} from 'express'

// Оригинальная функция
/*const catchAsync = function(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}*/



type CatchAsyncFnType<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>
type CatchAsyncReturnType<T> = (req: Request, res: Response, next: NextFunction) => void

export function catchAsync<T>(fn: CatchAsyncFnType<T>): CatchAsyncReturnType<T> {
    return function (req: Request, res: Response, next: NextFunction): void {
        fn(req, res, next).then().catch(next)
    }
}


/*
// Пример работающего кода
type catchAsyncFnType<T> = (req: T, res: T) => Promise<T>
type catchAsyncReturnType<T> = (req: T, res: T) => void

export function catchAsync<T>(fn: catchAsyncFnType<T>): catchAsyncReturnType<T> {
    return function (req: T, res: T): void {
        fn(req, res).catch()
    }
}

catchAsync(
    (): Promise<number> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > .5) resolve(2)
                else reject('This is an error')
            }, 500)
        })
    }
)*/
