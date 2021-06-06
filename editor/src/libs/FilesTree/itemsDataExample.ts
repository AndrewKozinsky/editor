import FilesTreeType from 'src/libs/FilesTree/types'

// Пример данных получаемых компонентов FilesTree
const itemsDataExample: FilesTreeType.Items = [
    {
        uuid: '1',
        type: 'folder',
        name: 'Расследования',
    },
    {
        uuid: '2',
        type: 'file',
        name: 'Без ОМОНа. Репортаж из спокойного Минска',
    },
    {
        uuid: '3',
        type: 'folder',
        name: 'Портреты',
    },
    {
        uuid: '4',
        type: 'folder',
        name: 'Спецпроекты',
        content: [
            {
                uuid: '5',
                type: 'folder',
                name: 'Железные маски',
                content: [
                    {
                        uuid: '6',
                        type: 'file',
                        name: 'Возведенный в степень. Портрет Виктора Садовничего, математика, который не просчитался.',
                    },
                    {
                        uuid: '7',
                        type: 'file',
                        name: 'Лермонтов',
                    },
                    {
                        uuid: '8',
                        type: 'file',
                        name: 'Спасти спецкора. Рассказ о том, почему власти согласились на освобождение Ивана Голунова.',
                    },
                ]
            },
            {
                uuid: '9',
                type: 'folder',
                name: 'Коронованные особы и дворцовый переворот',
            },
            {
                uuid: '10',
                type: 'folder',
                name: 'Тюрьма народов',
            },
        ]
    },
    {
        uuid: '11',
        type: 'folder',
        name: 'Мнения'
    },
]

export default itemsDataExample



// 11 12 13 14 15 16 17 18 19 20 21 22