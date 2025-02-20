"use client"

import {JSX} from "react"
import {useSelect, SelectOptionDefinition, SelectProvider, SelectValue} from "@mui/base/useSelect"
import {useOption} from "@mui/base/useOption"
import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import {Maybe} from "@lib/gql/__generated__/drupal.d"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

interface OptionProps {
  rootRef: RefObject<HTMLUListElement | null>
  children?: ReactNode
  value: string
  disabled?: boolean
}

const renderSelectedValue = (value: SelectValue<string, boolean>, options: SelectOptionDefinition<string>[]) => {
  if (Array.isArray(value)) {
    return value.map(item => (
      <span
        key={item}
        className="overflow-tw-hidden mb-2 block max-w-full text-ellipsis whitespace-nowrap rounded bg-archway p-5 text-white"
      >
        {renderSelectedValue(item, options)}
      </span>
    ))
  }
  const selectedOption = options.find(option => option.value === value)
  return selectedOption ? selectedOption.label : null
}

const CustomOption = (props: OptionProps) => {
  const {children, value, rootRef, disabled = false} = props
  const {getRootProps, highlighted, selected} = useOption({
    rootRef: rootRef,
    value,
    disabled,
    label: children,
  })

  const {id, ...otherProps}: {id: string} = getRootProps()
  const selectedStyles = "bg-archway text-white " + (highlighted ? "underline" : "")
  const highlightedStyles = "bg-black-10 text-black underline"

  useEffect(() => {
    if (highlighted && id && rootRef?.current?.parentElement) {
      const item = document.getElementById(id)
      if (item) {
        const itemTop = item?.offsetTop
        const itemHeight = item?.offsetHeight
        const parentScrollTop = rootRef.current.parentElement.scrollTop
        const parentHeight = rootRef.current.parentElement.offsetHeight

        if (itemTop < parentScrollTop) {
          rootRef.current.parentElement.scrollTop = itemTop
        }

        if (itemTop + itemHeight > parentScrollTop + parentHeight) {
          rootRef.current.parentElement.scrollTop = itemTop - parentHeight + itemHeight
        }
      }
    }
  }, [rootRef, id, highlighted])

  return (
    <li
      {...otherProps}
      id={id}
      className={
        "m-0 mb-2 cursor-pointer overflow-hidden px-10 py-2 hocus:underline " +
        (selected ? selectedStyles : highlighted ? highlightedStyles : "hocus:bg-black-10 hocus:text-black")
      }
    >
      {children}
    </li>
  )
}

interface Props {
  options: SelectOptionDefinition<string>[]
  label?: Maybe<string>
  ariaLabelledby?: Maybe<string>
  defaultValue?: SelectValue<string, boolean>
  onChange?: (_event: MouseEvent | KeyboardEvent | FocusEvent | null, _value: SelectValue<string, boolean>) => void
  multiple?: boolean
  disabled?: boolean
  value?: SelectValue<string, boolean>
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
  ...props
}: Props) => {
  const labelId = useId()
  const labeledBy = ariaLabelledby || labelId

  const inputRef = useRef<HTMLInputElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const [listboxVisible, setListboxVisible] = useState<boolean>(false)

  const {getButtonProps, getListboxProps, contextValue, value} = useSelect<string, boolean>({
    listboxRef,
    onOpenChange: setListboxVisible,
    open: listboxVisible,
    defaultValue,
    multiple,
    ...props,
  })

  useEffect(() => listboxRef.current?.focus(), [listboxVisible])

  useLayoutEffect(() => {
    const parentContainer = listboxRef.current?.parentElement?.getBoundingClientRect()
    if (parentContainer && (parentContainer.bottom > window.innerHeight || parentContainer.top < 0)) {
      listboxRef.current?.parentElement?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      })
    }
  }, [listboxVisible, value])

  const optionChosen = multiple && value ? value.length > 0 : !!value

  return (
    <div className="relative h-fit">
      <button
        {...getButtonProps()}
        className={twMerge(
          "w-full rounded border-2 border-fog-light bg-fog-light text-left",
          buttonClassName,
          !optionChosen && "rs-p-3"
        )}
        aria-labelledby={labeledBy}
      >
        {label && (
          <span
            className={clsx("relative block max-w-[calc(100%-30px)]", {
              "type-0 top-[-15px] w-full": optionChosen,
              "type-2": !optionChosen,
            })}
          >
            <span id={labelId} className={twMerge("block w-fit bg-white px-5", clsx({"bg-black-20": props.disabled}))}>
              {label}
            </span>
          </span>
        )}

        {optionChosen && (
          <div className="rs-p-3 type-2 block max-w-[calc(100%-50px)] overflow-hidden">
            {renderSelectedValue(value, options)}
          </div>
        )}
        {!optionChosen && placeholder && <span className="type-2 block max-w-[calc(100%-60px)]">{placeholder}</span>}

        <span className="rs-pr-3 absolute right-0 top-0 flex h-full items-center">
          {downIcon || <ChevronDownIcon width={50} />}
        </span>
      </button>

      <div
        className={
          "absolute left-0 top-full z-[10] max-h-[300px] w-full overflow-y-scroll border border-black-20 bg-white pb-5 shadow-lg " +
          (listboxVisible ? "" : "tw-hidden")
        }
      >
        <ul
          {...getListboxProps()}
          className={"list-unstyled " + (listboxVisible ? "" : "tw-hidden")}
          aria-hidden={!listboxVisible}
          aria-labelledby={labeledBy}
        >
          <SelectProvider value={contextValue}>
            {!required && !multiple && (
              <CustomOption value={emptyValue || ""} rootRef={listboxRef}>
                {emptyLabel}
              </CustomOption>
            )}

            {options.map(option => {
              return (
                <CustomOption key={option.value} value={option.value} rootRef={listboxRef}>
                  {option.label}
                </CustomOption>
              )
            })}
          </SelectProvider>
        </ul>
      </div>
      {name && <input ref={inputRef} name={name} type="tw-hidden" value={value || ""} />}
    </div>
  )
}

export default SelectList
