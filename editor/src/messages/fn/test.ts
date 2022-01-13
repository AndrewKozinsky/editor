
function get(type: 'str'): string
function get(type: 'num'): number
function get(type: 'str' | 'num'): string | number {
    switch (type) {
        case 'str':
            return 'Строка'
        case 'num':
            return 9
    }
}

const result = get('str') // string
const result2 = get('num') // number


