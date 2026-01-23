"use client"

import {HTMLAttributes, JSX, useId} from "react"
import twMerge from "@lib/utils/twMergeConfig"
import useAccordion from "@lib/hooks/useAccordion"
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid"

type Props = HTMLAttributes<HTMLElement> & {
  label: string
  /**
   * Button clickable element or string.
   */
  button: JSX.Element | string
  /**
   * If the accordion should be visible on first render.
   */
  initiallyVisible?: boolean
  /**
   * Button click event if the component is controlled.
   */
  onClick?: () => void
  /**
   * Panel visibility state if the component is controlled.
   */
  isVisible?: boolean
  /**
   * Extra attributes on the button element.
   */
  buttonProps?: HTMLAttributes<HTMLButtonElement>
  /**
   * Extra attributes on the panel element.
   */
  panelProps?: HTMLAttributes<HTMLDivElement>
}

const InputGroup = ({button, label, children, ...props}: Props) => {
  const id = useId()
  const {buttonProps, panelProps, expanded} = useAccordion({
    buttonId: `${id}-button`,
    initiallyVisible: true,
  })

  return (
    <fieldset
      aria-labelledby={`${id}-button`}
      {...props}
      className={twMerge("mb-10 max-h-96 space-y-3 overflow-y-auto overflow-x-hidden pb-5", props.className)}
    >
      <legend className="mb-10 w-full border-t border-black pt-10 font-semibold">
        <button
          type="button"
          {...buttonProps}
          className={twMerge("flex w-full items-center justify-between", buttonProps?.className)}
        >
          {label}
          {expanded && <ChevronUpIcon height={20} className="ml-auto shrink-0" />}

          {!expanded && <ChevronDownIcon height={20} className="ml-auto shrink-0" />}
        </button>
      </legend>
      <div {...panelProps}>
        <div className="mt-10 pb-24">{children}</div>
      </div>
    </fieldset>
  )
}

export default InputGroup
