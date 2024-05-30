"use client";

import {JSX} from "react";
import {useSelect, SelectOptionDefinition, SelectProvider, SelectValue} from "@mui/base/useSelect";
import {useOption} from "@mui/base/useOption";
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
  useState
} from "react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {useIsClient} from "usehooks-ts";
import {Maybe} from "@lib/gql/__generated__/drupal.d";
import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

interface OptionProps {
  rootRef: RefObject<HTMLUListElement>
  children?: ReactNode;
  value: string;
  disabled?: boolean;
}

const renderSelectedValue = (value: SelectValue<string, boolean>, options: SelectOptionDefinition<string>[]) => {

  if (Array.isArray(value)) {
    return value.map(item =>
      <span
        key={item}
        className="block bg-archway text-white rounded p-5 mb-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
      >
        {renderSelectedValue(item, options)}
      </span>
    );
  }
  const selectedOption = options.find((option) => option.value === value);
  return selectedOption ? selectedOption.label : null;
}

function CustomOption(props: OptionProps) {

  const {children, value, rootRef, disabled = false} = props;
  const {getRootProps, highlighted, selected} = useOption({rootRef: rootRef, value, disabled, label: children});

  const {id, ...otherProps}: { id: string } = getRootProps();
  const selectedStyles = "bg-archway text-white " + (highlighted ? "underline" : "")
  const highlightedStyles = "bg-black-10 text-black underline"

  useEffect(() => {
    if (highlighted && id && rootRef?.current?.parentElement) {
      const item = document.getElementById(id);
      if (item) {
        const itemTop = item?.offsetTop;
        const itemHeight = item?.offsetHeight;
        const parentScrollTop = rootRef.current.parentElement.scrollTop
        const parentHeight = rootRef.current.parentElement.offsetHeight;

        if (itemTop < parentScrollTop) {
          rootRef.current.parentElement.scrollTop = itemTop;
        }

        if ((itemTop + itemHeight) > parentScrollTop + parentHeight) {
          rootRef.current.parentElement.scrollTop = itemTop - parentHeight + itemHeight;
        }
      }
    }
  }, [rootRef, id, highlighted])

  return (
    <li
      {...otherProps}
      id={id}
      className={"m-0 mb-2 py-2 px-10 cursor-pointer hocus:underline overflow-hidden " + (selected ? selectedStyles : (highlighted ? highlightedStyles : "hocus:bg-black-10 hocus:text-black"))}
    >
      {children}
    </li>
  );
}

interface Props {
  options: SelectOptionDefinition<string>[];
  label?: Maybe<string>
  ariaLabelledby?: Maybe<string>
  defaultValue?: SelectValue<string, boolean>
  onChange?: (_event: MouseEvent | KeyboardEvent | FocusEvent | null, _value: SelectValue<string, boolean>) => void;
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
  ...props
}: Props) => {
  const labelId = useId();
  const labeledBy = ariaLabelledby || labelId;

  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const [listboxVisible, setListboxVisible] = useState<boolean>(false);
  const isClient = useIsClient()

  const {getButtonProps, getListboxProps, contextValue, value} = useSelect<string, boolean>({
    listboxRef,
    onOpenChange: setListboxVisible,
    open: listboxVisible,
    defaultValue,
    multiple,
    ...props
  });

  useEffect(() => listboxRef.current?.focus(), [listboxVisible]);

  useLayoutEffect(() => {
    const parentContainer = listboxRef.current?.parentElement?.getBoundingClientRect();
    if (parentContainer && (parentContainer.bottom > window.innerHeight || parentContainer.top < 0)) {
      listboxRef.current?.parentElement?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }, [listboxVisible, value])

  const optionChosen = (multiple && value) ? value.length > 0 : !!value;

  return (
    <div className="relative h-fit">
      <button
        {...getButtonProps()}
        className={clsx(twMerge("w-full border-2 border-black-10 rounded text-left p-5", buttonClassName), {"bg-black-20": props.disabled})}
        aria-labelledby={labeledBy}
      >
        {label &&
          <div className={clsx("relative  max-w-[calc(100%-30px)]", {
            "text-m0 top-[-15px] w-full": optionChosen,
            "text-m1": !optionChosen
          })}>
            <div id={labelId} className={twMerge("bg-white w-fit px-5", clsx({"bg-black-20": props.disabled}))}>
              {label}
            </div>
          </div>
        }


        {optionChosen &&
          <div className="overflow-hidden max-w-[calc(100%-30px)]">
            {renderSelectedValue(value, options)}
          </div>
        }

        <span className="absolute top-0 right-5 h-full flex items-center">
           {downIcon || <ChevronDownIcon width={20}/>}
        </span>
      </button>

      <div
        className={"absolute z-[10] w-full top-full left-0 max-h-[300px] pb-5 overflow-y-scroll shadow-lg border border-black-20 bg-white " + (listboxVisible ? "" : "hidden")}>
        <ul
          {...getListboxProps()}
          className={"list-unstyled " + (listboxVisible ? "" : "hidden")}
          aria-hidden={!listboxVisible}
          aria-labelledby={labeledBy}
        >
          <SelectProvider value={contextValue}>
            {(!required && !multiple) &&
              <CustomOption value={emptyValue || ""} rootRef={listboxRef}>
                {emptyLabel}
              </CustomOption>
            }

            {options.map((option) => {
              return (
                <CustomOption key={option.value} value={option.value} rootRef={listboxRef}>
                  {option.label}
                </CustomOption>
              );
            })}
          </SelectProvider>
        </ul>
      </div>
      {name &&
        <input ref={inputRef} name={name} type="hidden" value={value || ""}/>
      }
    </div>
  );
}


export default SelectList;