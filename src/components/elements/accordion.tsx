"use client"

import {HTMLAttributes, JSX, useId} from "react"
import {H2, H3, H4} from "@components/elements/headers"
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid"
import {twMerge} from "tailwind-merge"
import useAccordion from "@lib/hooks/useAccordion"

type Props = HTMLAttributes<HTMLElement> & {
  /**
   * Button clickable element or string.
   */
  button: JSX.Element | string
  /**
   * Heading level element.
   */
  headingLevel?: "h2" | "h3" | "h4"
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

const Accordion = ({button, children, headingLevel = "h2", ...props}: Props) => {
  const id = useId()
  const {buttonProps, panelProps, expanded} = useAccordion({buttonId: `${id}-button`})

  const Heading = headingLevel === "h2" ? H2 : headingLevel === "h3" ? H3 : H4
  return (
    <section
      aria-labelledby={`${id}-button`}
      className="rs-px-3 centered border border-fog-light bg-fog-light even:border-transparent even:bg-white lg:max-w-[920px] xl:max-w-[980px]"
      {...props}
    >
      <Heading className="rs-py-3 mb-0">
        <button
          {...buttonProps}
          className={twMerge("group flex w-full items-center justify-between", buttonProps?.className)}
        >
          {button}
          <span className="group-hocus:outline-3 m-4 rounded-full border-2 border-white bg-digital-red p-6 text-5xl font-normal text-white no-underline transition group-hocus:text-white group-hocus:underline group-hocus:outline group-hocus:outline-digital-red">
            {expanded && <MinusIcon height={30} className="ml-auto shrink-0" />}

            {!expanded && <PlusIcon height={30} className="ml-auto shrink-0" />}
          </span>
        </button>
      </Heading>

      <div {...panelProps}>
        <div className="mt-10 pb-24">{children}</div>
      </div>
    </section>
  )
}
export default Accordion
