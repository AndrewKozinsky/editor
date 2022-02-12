import TempCompTypes from './store/article/codeType/tempCompCodeType'

const image: TempCompTypes.Content = {
    html: '<img src="/misc/example-image.jpg" style="max-width: 300px" alt="image" data-em-id="image" />',
    elems: [
        {
            elemId: 'image',
            elemName: 'Image',
            elemAttrs: [
                {
                    elemAttrId: 'image-link',
                    elemAttrName: 'src',
                },
                {
                    elemAttrId: 'shadow-class',
                    elemAttrAlt: 'Класс',
                    elemAttrName: 'class',
                    elemAttrLockedValue: 'image',
                    elemAttrValues: [
                        {
                            elemAttrValueId: 'small-shadow',
                            elemAttrValueAlt: 'Маленькая тень',
                            elemAttrValueValue: 'image--shadow-small'
                        },
                        {
                            elemAttrValueId: 'standard-shadow',
                            elemAttrValueAlt: 'Обычная тень',
                            elemAttrValueValue: 'image--shadow-standard'
                        },
                        {
                            elemAttrValueId: 'big-shadow',
                            elemAttrValueAlt: 'Большая тень',
                            elemAttrValueValue: 'image--shadow-big'
                        },
                    ]
                },
                {
                    elemAttrId: 'misc-classes',
                    elemAttrAlt: 'Класс',
                    elemAttrName: 'class',
                    elemAttrView: 'checkbox',
                    elemAttrValues: [
                        {
                            elemAttrValueId: 'round-corners',
                            elemAttrValueAlt: 'Скругления',
                            elemAttrValueValue: 'image--round-corners'
                        },
                        {
                            elemAttrValueId: 'border',
                            elemAttrValueAlt: 'Обводка',
                            elemAttrValueValue: 'image--border'
                        },
                    ]
                },
            ]
        }
    ]
}



const header: TempCompTypes.Content = {
    html: '<h1 class="header" data-em-id="header"><span class="header-inner" data-em-id="header-inner"></span></h1>',
    elems: [
        {
            elemId: 'header',
            elemName: 'Заголовок',
            elemTags: {
                elemTagsValues: [
                    {
                        elemTagValueId: 'h1',
                        elemTagValueName: 'h1'
                    },
                    {
                        elemTagValueId: 'h2',
                        elemTagValueName: 'h2'
                    },
                    {
                        elemTagValueId: 'h3',
                        elemTagValueName: 'h3',
                    },
                ]
            }
        },
        {
            elemId: 'header-inner',
            elemName: 'Обёртка для текста',
            addTextComponent: true
        },
    ]
}

const link: TempCompTypes.Content = {
    html: '<a href="" data-em-id="link"></a>',
    elems: [
        {
            elemId: 'link',
            elemName: 'Ссылка',
            elemAttrs: [
                {
                    elemAttrId: 'href',
                    elemAttrName: 'href',
                }
            ],
            addTextComponent: true
        },
    ]
}

const table: TempCompTypes.Content = {
    html: '<table class="table" data-em-id="table"><caption class="table__caption" data-em-id="caption"></caption><thead><tr><th scope="col" data-em-id="table-head-th"><div class="table__head-th-inner" data-em-id="table-head-th-inner"></div></th></tr></thead><tbody><tr data-em-id="table-body-tr"><td data-em-id="table-body-td"><div class="table__body-td-inner" data-em-id="table-body-td-inner"></div></td></tr></tbody></table>',
    elems: [
        {
            elemId: 'table',
            elemName: 'Таблица'
        },
        {
            elemId: 'caption',
            elemName: 'Заголовок таблицы'
        },
        {
            elemId: 'table-head-th',
            elemName: 'Ячейка заголовка ряда',
        },
        {
            elemId: 'table-head-th-inner',
            elemName: 'Ячейка заголовка ряда ВНУТРЕННЯЯ',
            addTextComponent: true
        },
        {
            elemId: 'table-body-tr',
            elemName: 'Ряд'
        },
        {
            elemId: 'table-body-td',
            elemName: 'Ячейка'
        },
        {
            elemId: 'table-body-td-inner',
            elemName: 'Ячейка ВНУТРЕННЯЯ',
            addTextComponent: true
        },
    ]
}




const pseudoTable: TempCompTypes.Content = {
    html: '<section class="general" data-em-id="general"><div class="row" data-em-id="row"><div class="cell" data-em-id="cell"></div></div></section>',
    elems: [
        {
            elemId: 'general',
            elemName: 'General'
        },
        {
            elemId: 'row',
            elemName: 'Row',
            elemTags: {
                elemTagsValues: [
                    {
                        elemTagValueId: 'aside',
                        elemTagValueName: 'aside'
                    },
                    {
                        elemTagValueId: 'section',
                        elemTagValueName: 'section'
                    },
                ]
            },
            elemAttrs: [
                {
                    elemAttrId: 'class',
                    elemAttrName: 'class',
                    elemAttrAlt: 'Класс',
                    elemAttrView: 'checkbox',
                    elemAttrLockedValue: 'row',
                    elemAttrValues: [
                        {
                            elemAttrValueId: 'shadow',
                            elemAttrValueValue: 'shadow',
                            elemAttrValueAlt: 'Тень'
                        },
                        {
                            elemAttrValueId: 'round',
                            elemAttrValueValue: 'round',
                            elemAttrValueAlt: 'Закругление'
                        },
                    ]
                }
            ]
        },
        {
            elemId: 'cell',
            elemName: 'Cell'
        },
    ]
}

const pseudoTableChanged: TempCompTypes.Content = {
    html: '<section class="general" data-em-id="general"><div class="row" data-em-id="row"></div><div class="cell" data-em-id="cell"></div></section>',
    elems: [
        {
            elemId: 'general',
            elemName: 'General'
        },
        {
            elemId: 'row',
            elemName: 'Row',
            elemTags: {
                elemTagsValues: [
                    {
                        elemTagValueId: 'aside',
                        elemTagValueName: 'aside'
                    },
                    {
                        elemTagValueId: 'section',
                        elemTagValueName: 'section'
                    },
                ]
            },
            elemAttrs: [
                {
                    elemAttrId: 'class',
                    elemAttrName: 'class',
                    elemAttrAlt: 'Класс',
                    elemAttrView: 'checkbox',
                    elemAttrLockedValue: 'row',
                    elemAttrValues: [
                        {
                            elemAttrValueId: 'shadow',
                            elemAttrValueValue: 'shadow',
                            elemAttrValueAlt: 'Тень'
                        },
                        {
                            elemAttrValueId: 'round',
                            elemAttrValueValue: 'round',
                            elemAttrValueAlt: 'Закругление'
                        },
                    ]
                }
            ]
        },
        {
            elemId: 'cell',
            elemName: 'Cell'
        },
    ]
}
