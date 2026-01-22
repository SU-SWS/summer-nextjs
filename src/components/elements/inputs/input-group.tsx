"use client"

import {HTMLAttributes, useState} from "react"
import twMerge from "@lib/utils/twMergeConfig"
import {ChevronDownIcon} from "@heroicons/react/20/solid"

type Props = HTMLAttributes<HTMLElement> & {
  label: string
}

const InputGroup = ({label, children, ...props}: Props) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <fieldset {...props} className={twMerge("mb-10 space-y-3 pb-5", props.className)}>
      <legend className="mb-10 w-full border-t border-black pt-10 font-semibold">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between"
        >
          {label}
          <ChevronDownIcon width={20} className={expanded ? "rotate-180" : ""} />
        </button>
      </legend>

      {expanded && <div className="max-h-96 space-y-3 overflow-y-auto overflow-x-hidden">{children}</div>}
    </fieldset>
  )
}

export default InputGroup
