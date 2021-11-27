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
            elemText: {
                elemTextAttrs: [
                    {
                        elemTextAttrId: 1,
                        elemTextAttrName: 'class',
                        elemTextAttrValues: [
                            {elemTextAttrValueId: 1, elemTextAttrValueValue: 'one-class'},
                            {elemTextAttrValueId: 2, elemTextAttrValueValue: 'two-class'},
                        ]
                    },
                ],
                elemTextTags: [
                    {elemTextTagId: 8, elemTextTagName: 'span'},
                ]
            }
        }
    ]
}

// ================================================

const artData: ArticleTypes.Article = {
    dMeta: {
        dMaxCompId: 8
    },
    dComps: [
        {
            dCompType: 'component',
            dCompId: 1,
            tCompId: 152,
            dCompElems: [
                {
                    dCompElemId: 1,
                    tCompElemId: 'cell',
                    dCompElemGroup: 'cell-top',
                    dCompElemTag: 1,
                    dCompElemAttrs: [
                        { dCompElemAttrId: 1, dCompElemAttrValue: [1] }
                    ],
                    dCompElemChildren: [
                        {
                            dCompType: 'component',
                            dCompId: 2,
                            tCompId: 150,
                            dCompElems: [
                                {
                                    dCompElemId: 1,
                                    tCompElemId: 'banner',
                                    dCompElemGroup: 'banner-first',
                                    dCompElemAttrs: [
                                        { dCompElemAttrId: 1, dCompElemAttrValue: [1] }
                                    ]
                                },
                                {
                                    dCompElemId: 2,
                                    tCompElemId: 'banner-container',
                                    dCompElemGroup: 'banner-container-first',
    //                                 dCompElemAttrs: [
    //                                     { dCompElemAttrId: 1, dCompElemAttrValue: [1] }
    //                                 ],
                                    dCompElemChildren: [
                                        {
                                            dCompType: 'component',
                                            dCompId: 3,
                                            tCompId: 14
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    dCompElemId: 2,
                    tCompElemId: 'cell',
                    dCompElemGroup: 'cell-top',
                    dCompElemTag: 2,
                    dCompElemAttrs: [
                        { dCompElemAttrId: 1, dCompElemAttrValue: [2] }
                    ]
                }
            ]
        },

        // ============================================================================
        {
            dCompType: 'component',
            dCompId: 4,
            tCompId: 7,
            dCompElems: [
                {
                    dCompElemId: 1,
                    tCompElemId: 'paragraph',
                    dCompElemGroup: 'paragraph-first',
                    dCompElemChildren: [
                        {
                            dCompType: 'textComponent',
                            dCompId: 6,
                            tCompId: 2,
                            tCompElemId: 'paragraph',
                            dCompElemChildren: [
                                { dCompType: 'text', text: '' },
                                {
                                    dCompType: 'textTag',
                                    dTextTag: 8,
                                    dCompElemChildren: [
                                        { dCompType: 'text', text: ' '}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            dCompType: 'component',
            dCompId: 5,
            tCompId: 10,
            dCompElems: [
                {
                    dCompElemId: 1,
                    tCompElemId: 'paragraph',
                    dCompElemGroup: 'paragraph-first',
                    dCompElemChildren: [
                        {
                            dCompType: 'textComponent',
                            dCompId: 7,
                            tCompId: 144,
                            tCompElemId: 'paragraph',
                            dCompElemChildren: [
                                { dCompType: 'text', text: 'Hello' },
                                {
                                    dCompType: 'textTag',
                                    dTextTag: 8,
                                    dTagObjectAttrs: [
                                        {
                                            dCompElemAttrId: 1,
                                            dCompElemAttrValue: [1, 2]
                                        }
                                    ],
                                    dCompElemChildren: [
                                        { dCompType: 'text', text: 'Hello from span'}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
