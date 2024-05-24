"use client";

import {HTMLAttributes, JSX, useId} from "react";
import {H2, H3, H4} from "@components/elements/headers";
import { MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {twMerge} from "tailwind-merge";
import useAccordion from "@lib/hooks/useAccordion";

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

const Accordion = ({
  button,
  children,
  headingLevel = "h2",
  ...props
}: Props) => {
  const id = useId()
  const {buttonProps, panelProps, expanded} = useAccordion({buttonId: `${id}-button`});

  const Heading = headingLevel === "h2" ? H2 : headingLevel === "h3" ? H3 : H4;
  return (
    <section aria-labelledby={`${id}-button`} className="centered bg-fog-light even:bg-white rs-px-3 lg:max-w-[980px] border border-fog-light even:border-transparent" {...props}>
      <Heading className="mb-0 rs-py-3">
        <button
          {...buttonProps}
          className={twMerge("group w-full flex items-center justify-between", buttonProps?.className)}
        >
          {button}
          <span className="transition text-5xl text-white group-hocus:text-white bg-digital-red border-2 border-white group-hocus:outline group-hocus:outline-3 group-hocus:outline-digital-red no-underline group-hocus:underline p-6 font-normal rounded-full m-4">
            {expanded &&
              <MinusIcon height={30} className="shrink-0 ml-auto"/>
            }

            {!expanded &&
              <PlusIcon height={30} className="shrink-0 ml-auto" />
            }
          </span>
        </button>
      </Heading>

      <div
        {...panelProps}
      >
        <div className="mt-10 pb-24">
          {children}
        </div>
      </div>
    </section>
  )
}
export default Accordion;