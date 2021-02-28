import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// @ts-ignore
import {Story, Meta} from '@storybook/react/types-6-0'

import SvgIcon, { SvgIconPropType } from '../common/icons/SvgIcon';
import {Header} from './Header';

export default {
    title: 'Example/SvgIcon',
    component: SvgIcon,
} as Meta;

const Template: Story<SvgIconPropType> = (args) => <SvgIcon type='logo' {...args} />;

export const Logo = Template.bind({});
Logo.args = {
    type: 'logo'
}