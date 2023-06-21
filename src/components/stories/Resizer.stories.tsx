import react from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Resizer } from "../Resizer/Resizer";

const meta: Meta<typeof Resizer> = {
  component: Resizer,
};

export default meta;
type Story = StoryObj<typeof Resizer>;

export const WithProp: Story = {
  render: () => <Resizer label="buttton" primary={true} resizerFunc={(left:Number,top:Number, height:Number,width:Number)=>{
  }} />,
};

export const Resize: Story = {
   resizerFunc:(left:Number,top:Number, height:Number,width:Number)=>{
    alert(left)
  }
};
