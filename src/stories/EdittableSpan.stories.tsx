
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";

import {action} from "@storybook/addon-actions";
import {EditTableSpan} from "../EditTableSpan";


export default {
    title: 'Example/EditTableSpan',
    component: EditTableSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof EditTableSpan>;

const callbackAC=action("Value changed")
export const EditTableSpanExample:ComponentStory<typeof EditTableSpan> = ()=> <EditTableSpan callback={callbackAC} title={'Start'}/>
const Example1=EditTableSpanExample.bind({})





