import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import ArticleTypes from 'store/article/codeType/articleCodeType'

const gridTemplate: TempCompTypes.Code = {
    html: `<div class="grid">
        <div class="grid__inner">
            <div class="grid__cell grid__cell--thin" data-em-id="cell" data-em-group="cell-top">
                Hello
            </div>
        </div>
    </div>`,
    elems: [
        {
            tempElemId: 'cell',
            name: 'Ячейка',
            tags: {
                values: [
                    {id: 1, name: 'aside'},
                    {id: 2, name: 'section'},
                ],
                view: 'radio'
            },
            attribs: [
                {
                    id: 1,
                    name: 'class',
                    alt: 'Класс',
                    lockedValue: 'grid__cell',
                    view: 'radio',
                    values: [
                        {
                            id: 1,
                            value: 'grid__cell--thin',
                            alt: 'Thin cell',
                            checked: true
                        },
                        {
                            id: 2,
                            value: 'grid__cell--thick',
                            alt: 'Thick cell'
                        }
                    ]
                }
            ],
            text: {
                attribs: [
                    {
                        id: 1,
                        name: 'class',
                        values: [
                            {id: 1, value: 'one-class'},
                            {id: 2, value: 'two-class'},
                        ]
                    },
                    {
                        id: 2,
                        name: 'title',
                        values: [
                            {id: 1, value: 'Vika'},
                            {id: 2, value: 'Вика'}
                        ]
                    },
                ],
                tags: [
                    {id: 8, name: 'span'},
                ]
            }
        }
    ]
}

const bannerTemplate: TempCompTypes.Code = {
    html: `<div class="banner banner--pattern-1" data-em-id="banner" data-em-group="banner-first">
    <div class="banner__container" data-em-id="banner-container" data-em-group="banner-container-first"></div>
</div>`,
    elems: [
        {
            tempElemId: 'banner',
            name: 'Banner',
            attribs: [
                {
                    id: 1,
                    name: 'class',
                    lockedValue: 'banner',
                    view: 'checkbox',
                    values: [
                        {
                            id: 1,
                            value: 'banner--pattern-1',
                            checked: true
                        },
                        {
                            id: 2,
                            value: 'banner--pattern-2',
                        }
                    ],
                }
            ]
        },
        {
            tempElemId: 'banner-container',
            name: 'Banner container'
        }
    ]
}

const imageTemplate: TempCompTypes.Code = {
    html: `<img src="http://andrewkozinsky.ru/foreditor/duck3.jpg"
                                     style="box-shadow: 0 4px 10px rgba(155, 0, 0, .3); width: 100%; max-width: 290px"
                                     alt="Описание из шаблона" data-em-id="image">`
}

// ================================================

const artData: ArticleTypes.Article = [
    {
        type: 'component',
        dataCompId: 1,
        tempCompId: '3294f0c7-396a-41ac-9441-5014c5af75cc',
        elems: [
            {
                dataElemId: 1,
                tempElemId: 'cell',
                elemGroup: 'cell-top',
                tag: 1,
                attribs: [
                    { id: 1, value: [1] }
                ],
                children: [
                    {
                        type: 'component',
                        dataCompId: 2,
                        tempCompId: '3d2b48e4-691b-44b7-a838-c592c6922926',
                        elems: [
                            {
                                dataElemId: 1,
                                tempElemId: 'banner',
                                elemGroup: 'banner-first',
                                attribs: [
                                    { id: 1, value: [1] }
                                ]
                            },
                            {
                                dataElemId: 2,
                                tempElemId: 'banner-container',
                                elemGroup: 'banner-container-first',
                                attribs: [
                                    { id: 1, value: [1] }
                                ],
                                children: [
                                    {
                                        type: 'component',
                                        dataCompId: 4,
                                        tempCompId: 'f990bbb5-bdc3-4fa7-a3f1-603b89f5f5fa'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                dataElemId: 2,
                tempElemId: 'cell',
                elemGroup: 'cell-top',
                tag: 2,
                attribs: [
                    { id: 1, value: [2] }
                ],
                children: [
                    {
                        type: 'textComponent',
                        dataCompId: 3,
                        tempCompId: '3294f0c7-396a-41ac-9441-5014c5af75cc',
                        tempElemId: 'cell',
                        children: [
                            { type: 'text', text: 'Hello' },

                            {
                                type: 'textTag',
                                tag: 8,
                                attribs: [
                                    {id: 1, value: [1, 2]}
                                ],
                                children: [
                                    { type: 'text', text: 'Hello from span'}
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }
]