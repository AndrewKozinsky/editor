import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0'
import Header, {HeaderPropType} from '../modules/textBlocks/Header/Header'


export default {
    title: 'Text blocks/Header',
    component: Header,
} as Meta

const Template: Story<HeaderPropType> = (args) => <Header {...args} />

export const H1 = Template.bind({})
H1.args = {
    text: 'Съешь ещё этих мягких французских булок, да выпей чаю',
    type: 'h1'
}