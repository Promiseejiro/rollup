import react from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button/Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    label: "Primary 😃",
    // size: "large",
  },
};

export const WithProp: Story = {
  render: () => <Button label="buttton" primary={true} backgroundColor="red" />,
};

export const Secondary: Story = {
  args: {
    label: "Secondary 😇",
  },
};
