import { Meeting } from '.';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Meeting> = {
    title: 'Example/Meeting',
    component: Meeting,
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Meeting>;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Meeting',
    },
};
