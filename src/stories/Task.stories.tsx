
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";


export default {
    title: 'Example/Task',
    component: Task,
    decorators:[ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Task>;

const callbackAC=action("Button 'add' was pressed inside the form")
 export const TaskExample:ComponentStory<typeof Task> = ()=> <>
     <Task task={{id:'1', title: 'HTML', isDone: true}} todolistId={'todolistId1'}/>
         <Task task={{id:'2', title: 'CSS', isDone: false}} todolistId={'todolistId2'}/>
 </>
    ;
  const Example1=TaskExample.bind({});




