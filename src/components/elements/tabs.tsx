"use client"

import {Tabs as BaseTabs} from "@base-ui/react/tabs"
import {HTMLAttributes, ReactNode} from "react"
import cn from "@lib/utils/className"
import {useRouter, useSearchParams} from "next/navigation"

// View the API for all the tab components here: https://base-ui.com/react/components/tabs.
type TabValue = BaseTabs.Tab.Value

type TabsProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The query parameter in the URL for sharing or reloading.
   */
  paramId?: string
  /**
   * Default tab for initial rendering.
   */
  defaultTab?: TabValue
  /**
   * Which direction the tabs are displayed.
   */
  orientation?: BaseTabs.Root.Orientation
}

export const Tabs = ({paramId = "tab", orientation, defaultTab, children, ...props}: TabsProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const onValueChange = (value: TabValue, {reason}: BaseTabs.Root.ChangeEventDetails) => {
    // Only a user's choice belongs in the url, not Base UI's automatic fallbacks.
    if (reason !== "none") return
    const params = new URLSearchParams(searchParams)
    params.delete(paramId)
    if (value) params.set(paramId, `${value}`)
    router.replace(`?${params.toString()}`, {scroll: false})
  }
  const paramValue = searchParams.get(paramId)
  const initialTab = defaultTab || (paramValue && parseInt(paramValue))

  return (
    <BaseTabs.Root {...props} orientation={orientation} defaultValue={initialTab || 0} onValueChange={onValueChange}>
      {children}
    </BaseTabs.Root>
  )
}

type TabsListProps = {
  /**
   * <Tab> components.
   */
  children: ReactNode
  /**
   * Classes for the tab list.
   */
  className?: HTMLAttributes<HTMLDivElement>["className"]
  /**
   * Attributes for the tab list.
   */
  containerProps?: Omit<HTMLAttributes<HTMLDivElement>, "className">
}

export const TabsList = ({containerProps, className, children}: TabsListProps) => (
  <BaseTabs.List
    {...containerProps}
    activateOnFocus
    className={cn("flex data-[orientation=vertical]:flex-col", className)}
  >
    {children}
  </BaseTabs.List>
)

type TabProps = {
  /**
   * Value that pairs the tab with its <TabPanel>.
   */
  value: TabValue
  /**
   * Whether the tab can be selected.
   */
  disabled?: boolean
  /**
   * React node or string for the tab.
   */
  children: ReactNode
  /**
   * Classes for the button element.
   */
  className?: HTMLAttributes<HTMLDivElement>["className"]
  /**
   * Extra attributes for the button element.
   */
  buttonProps?: HTMLAttributes<HTMLButtonElement>
}

export const Tab = ({buttonProps, className, children, ...props}: TabProps) => (
  <BaseTabs.Tab
    {...buttonProps}
    {...props}
    className={cn("border-b-3 border-transparent p-7.5 text-left data-[active]:border-cardinal-red", className)}
  >
    {children}
  </BaseTabs.Tab>
)

type TabPanelProps = {
  /**
   * Value of the <Tab> that shows this panel.
   */
  value: TabValue
  /**
   * Panel contents.
   */
  children: ReactNode
  /**
   * Classes for the panel.
   */
  className?: HTMLAttributes<HTMLDivElement>["className"]
  /**
   * Extra attributes for the panel.
   */
  panelProps?: HTMLAttributes<HTMLElement>
}

export const TabPanel = ({panelProps, className, value, children}: TabPanelProps) => (
  <BaseTabs.Panel {...panelProps} value={value} render={<section />} className={className}>
    {children}
  </BaseTabs.Panel>
)
