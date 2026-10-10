import {ChangeEvent, HTMLAttributes, InputHTMLAttributes} from "react"
import cn from "@lib/utils/className"

type Props = HTMLAttributes<HTMLLabelElement> & {
  value: string | number
  name?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  onRadioChange?: (_e: ChangeEvent<HTMLInputElement>) => void
}
const RadioButton = ({value, name, onRadioChange, inputProps, children, ...props}: Props) => {
  return (
    <label {...props} className={cn("group flex cursor-pointer items-center gap-12.5", props.className)}>
      <input
        {...inputProps}
        onChange={onRadioChange}
        type="radio"
        value={value}
        name={name}
        className="peer relative -left-[999px] h-0 w-0"
      />
      <span className="realtive m-2.5 block h-25 w-25 rounded-full border-3 border-white outline-1 outline-black transition-colors outline-solid peer-checked:bg-black peer-hover:bg-cardinal-red peer-focus-visible:bg-cardinal-red" />
      <span className="block peer-hover:underline peer-focus-visible:underline">{children}</span>
    </label>
  )
}
export default RadioButton
