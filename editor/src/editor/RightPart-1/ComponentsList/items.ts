import FilesTreeType from 'libs/FilesTree/types'

const items: FilesTreeType.Items = [
    {
        id: '1',
        type: 'folder',
        name: 'Расследования',
    },
    {
        id: '2',
        type: 'file',
        name: 'Без ОМОНа. Репортаж из спокойного Минска',
    },
    {
        id: '3',
        type: 'folder',
        name: 'Портреты',
    },
    {
        id: '4',
        type: 'folder',
        name: 'Спецпроекты',
        content: [
            {
                id: '5',
                type: 'folder',
                name: 'Железные маски',
                content: [
                    {
                        id: '6',
                        type: 'file',
                        name: 'Возведенный в степень. Портрет Виктора Садовничего, математика, который не просчитался.',
                    },
                    {
                        id: '7',
                        type: 'file',
                        name: 'Лермонтов',
                    },
                    {
                        id: '8',
                        type: 'file',
                        name: 'Спасти спецкора. Рассказ о том, почему власти согласились на освобождение Ивана Голунова.',
                    },
                ]
            },
            {
                id: '9',
                type: 'folder',
                name: 'Коронованные особы и дворцовый переворот',
            },
            {
                id: '10',
                type: 'folder',
                name: 'Тюрьма народов',
            },
        ]
    },
    {
        id: '11',
        type: 'folder',
        name: 'Мнения'
    },
]

export default items



// 11 12 13 14 15 16 17 18 19 20 21 22