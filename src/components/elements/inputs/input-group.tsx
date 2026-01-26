"use client"

import {HTMLAttributes, useId} from "react"
import twMerge from "@lib/utils/twMergeConfig"
import useAccordion from "@lib/hooks/useAccordion"
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid"

type Props = HTMLAttributes<HTMLElement> & {
  label: string
}

const InputGroup = ({label, children, ...props}: Props) => {
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
          className={twMerge(
            "flex w-full items-center justify-between text-black no-underline hocus:text-digital-blue hocus:underline",
            buttonProps?.className
          )}
        >
          {label}
          {expanded && (
            <ChevronUpIcon height={20} className="ml-auto shrink-0 text-black no-underline hocus:text-digital-blue" />
          )}

          {!expanded && (
            <ChevronDownIcon height={20} className="ml-auto shrink-0 text-black no-underline hocus:text-digital-blue" />
          )}
        </button>
      </legend>
      <div {...panelProps}>
        <div className="mt-10 pb-24">{children}</div>
      </div>
    </fieldset>
  )
}

export default InputGroup
