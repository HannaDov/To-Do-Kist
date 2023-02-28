
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {FullInput} from "../FullInput";


export default {
    title: 'Example/FullInput',
    component: FullInput,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof FullInput>;


 export const FullInputExample:ComponentStory<typeof FullInput> = ()=> <FullInput callback={(title)=>alert(title)} />;
  const Example1=FullInputExample.bind({});




