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
        },
        {
            elemId: 'header-inner',
            elemName: 'Обёртка для текста',
            addTextComponent: true
        },
    ]
}