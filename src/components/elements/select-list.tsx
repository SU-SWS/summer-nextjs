"use client"

import {JSX, ReactNode, useId, useRef, useState} from "react"
import {Select} from "@base-ui/react/select"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {Maybe} from "@lib/gql/__generated__/graphql"
import cn from "@lib/utils/className"

// View the API for the select component here: https://base-ui.com/react/components/select.
export type SelectOptionDefinition = {value: string; label: string}
export type SelectValue = string | string[] | null

const renderSelectedValue = (value: SelectValue, options: SelectOptionDefinition[]): ReactNode => {
  if (Array.isArray(value)) {
    return value.map(item => (
      <span
        key={item}
        className="mb-5 block max-w-full rounded-[0.3rem] bg-archway p-12.5 text-ellipsis whitespace-nowrap text-white"
      >
        {renderSelectedValue(item, options)}
      </span>
    ))
  }
  const selectedOption = options.find(option => option.value === value)
  return selectedOption ? selectedOption.label : null
}

const CustomOption = ({value, children}: {value: string | null; children: string}) => (
  <Select.Item
    value={value}
    label={children}
    className={({selected, highlighted}) =>
      cn(
        "m-0 mb-5 cursor-pointer overflow-hidden px-25 py-5 hocus:underline",
        selected
          ? cn("bg-archway text-white", {underline: highlighted})
          : highlighted
            ? "bg-black-10 text-black underline"
            : "hocus:bg-black-10 hocus:text-black"
      )
    }
  >
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
)

interface Props {
  options: SelectOptionDefinition[]
  label?: Maybe<string>
  ariaLabelledby?: Maybe<string>
  defaultValue?: SelectValue
  onChange?: (_event: Event | null, _value: SelectValue) => void
  multiple?: boolean
  disabled?: boolean
  value?: SelectValue
  required?: boolean
  emptyValue?: Maybe<string>
  emptyLabel?: Maybe<string>
  name?: Maybe<string>
  downIcon?: JSX.Element
  buttonClassName?: string
  onFocus?: () => void
  placeholder?: string
}

const SelectList = ({
  options = [],
  label,
  multiple,
  ariaLabelledby,
  required,
  defaultValue,
  name,
  emptyValue,
  emptyLabel = "- None -",
  downIcon,
  buttonClassName,
  placeholder,
  onChange,
  onFocus,
  disabled,
  ...props
}: Props) => {
  const labelId = useId()
  const labeledBy = ariaLabelledby || labelId
  const containerRef = useRef<HTMLDivElement>(null)

  // The trigger's layout depends on whether something is chosen, so track the value even when uncontrolled.
  const [internalValue, setInternalValue] = useState<SelectValue>(defaultValue ?? (multiple ? [] : null))
  const value = props.value !== undefined ? props.value : internalValue
  const optionChosen = Array.isArray(value) ? value.length > 0 : !!value

  return (
    <Select.Root<string | null, boolean>
      value={value}
      onValueChange={(newValue, eventDetails) => {
        setInternalValue(newValue as SelectValue)
        onChange?.(eventDetails.event, newValue as SelectValue)
      }}
      multiple={multiple}
      required={required}
      disabled={disabled}
      name={name || undefined}
      // Leave the page scrollable while the list is open, the same as a native select.
      modal={false}
    >
      <div ref={containerRef} className="relative h-fit">
        <Select.Trigger
          className={cn(
            "w-full rounded-[0.3rem] border-2 border-fog-light bg-fog-light text-left",
            buttonClassName,
            !optionChosen && "rs-p-3"
          )}
          aria-labelledby={labeledBy}
          onFocus={onFocus}
        >
          {label && (
            <span
              className={cn("relative block max-w-[calc(100%-30px)]", {
                "top-[-15px] w-full type-0": optionChosen,
                "type-2": !optionChosen,
              })}
            >
              <span id={labelId} className={cn("block w-fit bg-white px-12.5", {"bg-black-20": disabled})}>
                {label}
              </span>
            </span>
          )}

          {optionChosen && (
            <div className="block max-w-[calc(100%-50px)] overflow-hidden rs-p-3 type-2">
              {renderSelectedValue(value, options)}
            </div>
          )}
          {!optionChosen && placeholder && <span className="block max-w-[calc(100%-60px)] type-2">{placeholder}</span>}

          <Select.Icon className="absolute top-0 right-0 flex h-full items-center rs-pr-3">
            {downIcon || <ChevronDownIcon width={50} />}
          </Select.Icon>
        </Select.Trigger>

        {/* Portal into the wrapper so the list inherits the surrounding typography. */}
        <Select.Portal container={containerRef}>
          <Select.Positioner alignItemWithTrigger={false} side="bottom" align="start" className="z-[10]">
            <Select.Popup className="max-h-[min(300px,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto border border-black-20 bg-white pb-12.5 shadow-lg outline-hidden">
              <Select.List className="list-unstyled" aria-labelledby={labeledBy}>
                {!required && !multiple && <CustomOption value={emptyValue || null}>{emptyLabel || ""}</CustomOption>}

                {options.map(option => (
                  <CustomOption key={option.value} value={option.value}>
                    {option.label}
                  </CustomOption>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </div>
    </Select.Root>
  )
}

export default SelectList
