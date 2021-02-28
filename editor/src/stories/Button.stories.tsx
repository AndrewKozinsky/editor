import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { ButtonPropType } from '../common/formElements/Button/Button'

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonPropType> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Регистрация',
};

/*export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};*/

/*export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};*/

/*export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};*/
