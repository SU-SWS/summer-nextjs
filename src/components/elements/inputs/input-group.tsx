"use client"

import {HTMLAttributes, useId} from "react"
import twMerge from "@lib/utils/twMergeConfig"
import useAccordion from "@lib/hooks/useAccordion"
import {ChevronUpIcon} from "@heroicons/react/20/solid"
import clsx from "clsx"

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
      className={twMerge("mb-10 space-y-3 overflow-x-hidden pb-5", props.className)}
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

          <ChevronUpIcon
            height={20}
            className={twMerge(
              "ml-auto shrink-0 text-black no-underline transition-all duration-300 hocus:text-digital-blue",
              clsx({"rotate-180": !expanded})
            )}
          />
        </button>
      </legend>
      <div {...panelProps}>
        <div className="mt-10 pb-24">{children}</div>
      </div>
    </fieldset>
  )
}

export default InputGroup
