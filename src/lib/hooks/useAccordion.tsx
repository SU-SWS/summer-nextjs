"use client";

import {HTMLAttributes, useId} from "react";
import {useBoolean} from "usehooks-ts";

type Props = {
  initiallyVisible?: boolean
  panelId?: string
  buttonId?: string
}

const useAccordion = ({initiallyVisible, panelId, buttonId}: Props = {}) => {
  const {value: expanded, toggle: toggleExpanded} = useBoolean(initiallyVisible)
  const id = useId();

  const buttonProps: HTMLAttributes<HTMLButtonElement> = {
    "aria-controls": panelId || `${id}--panel`,
    "aria-expanded": expanded,
    id: buttonId || `${id}--button`,
    onClick: toggleExpanded,
  }
  const panelProps: HTMLAttributes<HTMLElement> = {
    "aria-labelledby": buttonId || `${id}--button`,
    id: panelId || `${id}--panel`,
    role: "region",
  }
  return {buttonProps, panelProps, expanded, toggleExpanded}
}
export default useAccordion;