import React from 'react'

/**
 * HOC обрабатывающий непойманные ошибки.
 * @param Component
 */
export default function withErrorCatcher(Component: React.ElementType) {
    return class ErrorCatcher extends React.Component<any, any> {
        public state: {hasError: boolean} = {
            hasError: false
        }

        componentDidCatch() {
            this.setState({ hasError: true });

            // Если это режим публикации, то стереть все данные из LocalStorage
            // чтобы попытаться загрузить редактор с настройками по умолчанию.
            if (!process.env.isDev) {
                localStorage.clear()
            }
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div>
                        <p><b>Произошла ошибка</b></p>
                        <hr />
                        <p>Настройки редактора сброшены.</p>
                        <hr />
                        <p>Пожалуйста, напишите на andkozinsky@gmail.com для получения помощи.</p>
                    </div>
                )
            }

            return <Component />
        }
    }
}
