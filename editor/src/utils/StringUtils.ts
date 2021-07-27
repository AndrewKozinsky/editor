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


/** Функция возвращает случайный идентификатор */
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


/**
 * Функция принимает строку вида box-shadow и превращает её в boxShadow.
 * @param {String} str — строка, которую нужно перевести в верблюжью нотацию.
 * @returns {String} — возвращает строку переведённую в верблюжью нотацию.
 */
/*
export function convertToCamelCase(str: string) {
    // box-shadow -> boxShadow

    let arr = str.split('-');

    arr = arr.map((str, i) => {
        if(i > 0) return str[0].toUpperCase() + str.substr(1);
        return str
    });

    return arr.join('')
}*/
