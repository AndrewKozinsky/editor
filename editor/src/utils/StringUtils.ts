// ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРОКАМИ

/**
 * Функция принимает массив строк и формирует из них
 * строку разделённую пробелами для формирования классов CSS.
 * @param {Array} classesArr
 */
export function makeCN(classesArr: string[]) {
    // Сформировать новый массив классов без пустых значений
    const filteredClassesArr = classesArr.filter(cls => {
        return (cls && cls !== '')
    })

    return filteredClassesArr.join(' ')
}


/**
 * Функция возвращает случайный идентификатор
 */
export function getRandomId() {
    const randomNum = Math.random() * 100000
    return 'id' + Math.round(randomNum)
}

/**
 * Функция принимает почту и возвращает домен
 * @param {String} email — почта
 */
export function getDomainFromEmail(email: string) {
    return email.split('@')[1]
}