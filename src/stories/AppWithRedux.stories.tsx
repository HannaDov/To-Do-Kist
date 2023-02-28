
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";

import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";
import AppWithRedux from "../AppWithRedux";


export default {
    title: 'Example/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof AppWithRedux>;


 export const AppWithReduxExample:ComponentStory<typeof AppWithRedux> = ()=><AppWithRedux/>


  const Example1=AppWithRedux.bind({});




