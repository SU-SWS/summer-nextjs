import type {Meta, StoryObj} from "@storybook/react"
import GlobalMessage from "@components/config-pages/global-message"
import {ComponentProps} from "react"
import {Link, Text} from "@lib/gql/__generated__/drupal"

type ComponentStoryProps = ComponentProps<typeof GlobalMessage> & {
  messageText?: Text["processed"]
  linkUrl?: Link["url"]
  linkTitle?: Link["title"]
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
  title: "Design/Config Pages/Global Message",
  component: GlobalMessage,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<ComponentStoryProps>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SuccessMessage: Story = {
  render: ({linkUrl, linkTitle, messageText, ...args}) => {
    return <GlobalMessage {...args} />
  },
  args: {},
}
