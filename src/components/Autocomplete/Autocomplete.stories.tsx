import { Autocomplete } from "./Autocomplete";
import type { Meta, StoryObj } from '@storybook/react';
import { AutocompleteProps } from "./Autocomplete.types";
import { v4 } from "uuid";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  argTypes: {

  }
}

export default meta

type Story = StoryObj<typeof Autocomplete>

const Template = (args: AutocompleteProps) => (
  <Autocomplete {...args} />
)

export const Default: Story = {
  render: Template,
  args: {
    label: "Auto Complete",
    renderItem: () => (value) => <li key={v4()} className="listitem">{value}</li>,
    list: [
      "white",
      "black",
      "yellow",
      "red",
      "gray",
      "blue",
      "orange",
      "purple",
      "green",
      "golden"
    ]
  }
}