import twMerge from "@lib/utils/twMergeConfig"
import {HTMLAttributes} from "react"

const ReverseVisualOrder = ({children, ...props}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={twMerge("flex flex-col-reverse", props.className)}>
      {children}
    </div>
  )
}
export default ReverseVisualOrder
