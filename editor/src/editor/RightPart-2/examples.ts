import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import ArticleTypes from 'store/article/codeType/articleCodeType'

const gridTemplate: TempCompTypes.Content = {
    name: 'Grid',
    html: `<div class="grid">
        <div class="grid__inner">
            <div class="grid__cell grid__cell--thin" data-em-id="cell" data-em-group="cell-top">
                Hello
            </div>
        </div>
    </div>`,
    elems: [
        {
            elemId: 'cell',
            elemName: 'Ячейка',
            elemTags: {
                elemTagsValues: [
                    {elemTagValueId: 1, elemTagValueName: 'aside'},
                    {elemTagValueId: 2, elemTagValueName: 'section'},
                ],
                elemTagsView: 'radio'
            },
            elemAttrs: [
                {
                    elemAttrId: 1,
                    elemAttrName: 'class',
                    elemAttrAlt: 'Класс',
                    elemAttrLockedValue: 'grid__cell',
                    elemAttrView: 'radio',
                    elemAttrValues: [
                        {
                            elemAttrValueId: 1,
                            elemAttrValueValue: 'grid__cell--thin',
                            elemAttrValueAlt: 'Thin cell',
                            elemAttrValueChecked: true
                        },
                        {
                            elemAttrValueId: 2,
                            elemAttrValueValue: 'grid__cell--thick',
                            elemAttrValueAlt: 'Thick cell'
                        }
                    ]
                }
            ]
        }
    ]
}

const bannerTemplate: TempCompTypes.Content = {
    name: 'Banner',
    html: `<div class="banner banner--pattern-1" data-em-id="banner" data-em-group="banner-first">
    <div class="banner__container" data-em-id="banner-container" data-em-group="banner-container-first"></div>
</div>`,
    elems: [
        {
            elemId: 'banner',
            elemName: 'Banner',
            elemAttrs: [
                {
                    elemAttrId: 1,
                    elemAttrName: 'class',
                    elemAttrLockedValue: 'banner',
                    elemAttrView: 'checkbox',
                    elemAttrValues: [
                        {
                            elemAttrValueId: 1,
                            elemAttrValueValue: 'banner--pattern-1',
                            elemAttrValueChecked: true
                        },
                        {
                            elemAttrValueId: 2,
                            elemAttrValueValue: 'banner--pattern-2',
                        }
                    ],
                }
            ]
        },
        {
            elemId: 'banner-container',
            elemName: 'Banner container'
        }
    ]
}

const imageTemplate: TempCompTypes.Content = {
    name: 'Image',
    html: `<img src="http://andrewkozinsky.ru/foreditor/duck3.jpg"
             style="box-shadow: 0 4px 10px rgba(155, 0, 0, .3); width: 100%; max-width: 290px"
             alt="Описание из шаблона" data-em-id="image">`
}

const paragraphTemplate: TempCompTypes.Content = {
    name: 'Paragraph',
    html: `<p class="paragraph" data-em-id="paragraph" data-em-group="paragraph-first"></p>`,
    elems: [
        {
            elemId: 'paragraph',
            elemName: 'Paragraph',
            elemTextInside: true
        }
    ]
}

const burgerTemplate: TempCompTypes.Content = {
    name: 'Burger',
    html: `<div class="burger burger--white" data-em-id="general" data-em-group="general-main">
    <div class="burger__top">
        <div class="burger__cell burger__cell--round" data-em-id="cell" data-em-group="cell-top"></div>
        <div class="burger__cell burger__cell--round" data-em-id="cell" data-em-group="cell-top"></div>
    </div>
    <div class="burger__mediterranean" data-em-id="mediterranean" data-em-group="mediterranean-main"></div>
    <div class="burger__cell" data-em-id="cell" data-em-group="cell-bottom"></div>
</div>`,
    elems: [
        {
            elemId: 'general',
            elemName: 'Главная обёртка',
            elemAttrs: [
                {
                    elemAttrId: 1,
                    elemAttrName: 'class',
                    elemAttrAlt: 'Класс',
                    elemAttrView: 'text',
                    elemAttrLockedValue: 'burger ',
                    elemAttrValues: [
                        {
                            elemAttrValueId: 1,
                            elemAttrValueValue: 'burger--white',
                            elemAttrValueAlt: 'Белая подложка',
                            elemAttrValueChecked: true
                        },
                        {
                            elemAttrValueId: 2,
                            elemAttrValueValue: 'burger--green',
                            elemAttrValueAlt: 'Зелёная подложка',
                            elemAttrValueChecked: false
                        },
                    ]
                },
            ],
            elemTags: {
                elemTagsValues: [
                    {elemTagValueId: 1, elemTagValueName: 'aside'},
                    {elemTagValueId: 2, elemTagValueName: 'section'},
                ]
            }
        },
        {
            elemId: 'cell',
            elemName: 'Ячейка',
            elemTags: {
                elemTagsValues: [
                    {elemTagValueId: 5, elemTagValueName: 'main'},
                ]
            },
            elemTextInside: true
        },
        {
            elemId: 'mediterranean',
            elemName: 'Средняя часть'
        },
    ]
}

// ================================================

const artData: ArticleTypes.Article = {
    dMeta: {
        dMaxCompId: 12
    },
    dComps: [
        {
            dCompType: 'component',
            dCompId: 1,
            tCompId: 106,
            dElems: [
                {
                    dCompElemId: 1,
                    tCompElemId: 'general',
                    dCompElemGroup: 'general-main',
                    dCompElemTag: 2,
                    dCompElemAttrs: [
                        {dCompElemAttrId: 1, dCompElemAttrValue: [1, 2]},
                    ]
                },
                {
                    dCompElemId: 2,
                    tCompElemId: 'cell',
                    dCompElemGroup: 'cell-top',
                    dCompElemChildren: {
                        dCompType: 'simpleTextComponent',
                        dCompId: 10,
                        text: 'Привет, это Навальный!'
                    }
                },
                {
                    dCompElemId: 3,
                    tCompElemId: 'cell',
                    dCompElemGroup: 'cell-top',
                    dCompElemTag: 5,
                },
                {
                    dCompElemId: 4,
                    tCompElemId: 'cell',
                    dCompElemGroup: 'cell-top',
                    dCompElemChildren: {
                        dCompType: 'simpleTextComponent',
                        dCompId: 11,
                        text: ''
                    }
                },
                {
                    dCompElemId: 5,
                    tCompElemId: 'mediterranean',
                    dCompElemGroup: 'mediterranean-main',
                    dCompElemChildren: [
                        {
                            dCompType: 'component',
                            dCompId: 2,
                            tCompId: 106,
                            dElems: [
                                {
                                    dCompElemId: 1,
                                    tCompElemId: 'general',
                                    dCompElemGroup: 'general-main',
                                    dCompElemTag: 2,
                                    dCompElemAttrs: [
                                        {dCompElemAttrId: 1, dCompElemAttrValue: []},
                                    ]
                                },
                                {
                                    dCompElemId: 2,
                                    tCompElemId: 'cell',
                                    dCompElemGroup: 'cell-top',
                                },
                                {
                                    dCompElemId: 3,
                                    tCompElemId: 'cell',
                                    dCompElemGroup: 'cell-top',
                                    dCompElemTag: 5
                                },
                                {
                                    dCompElemId: 4,
                                    tCompElemId: 'cell',
                                    dCompElemGroup: 'cell-top',
                                },
                                {
                                    dCompElemId: 5,
                                    tCompElemId: 'mediterranean',
                                    dCompElemGroup: 'mediterranean-main',
                                },
                                {
                                    dCompElemId: 6,
                                    tCompElemId: 'cell',
                                    dCompElemGroup: 'cell-bottom',
                                },
                            ]
                        }
                    ]
                },
                {
                    dCompElemId: 6,
                    tCompElemId: 'cell',
                    dCompElemGroup: 'cell-bottom',
                    dCompElemChildren: {
                        dCompType: 'simpleTextComponent',
                        dCompId: 12,
                        text: ''
                    }
                },
            ],
        }
    ]
}