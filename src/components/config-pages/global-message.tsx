import Wysiwyg from "@components/elements/wysiwyg"
import {StanfordGlobalMessage} from "@lib/gql/__generated__/drupal.d"
import ActionLink from "@components/elements/action-link"
import {twMerge} from "tailwind-merge"
import clsx from "clsx"
import {HTMLAttributes, useId} from "react"
import {getConfigPage} from "@lib/gql/gql-queries"
import {H2} from "@components/elements/headers"

type Props = HTMLAttributes<HTMLElement> & {}

const GlobalMessage = async ({...props}: Props) => {
  const id = useId()

  const globalMessageConfig = await getConfigPage<StanfordGlobalMessage>("StanfordGlobalMessage")
  if (!globalMessageConfig?.suGlobalMsgEnabled) return

  let messageType = "globalMessageConfig.suGlobalMsgType"
  messageType = "warning"

  const wrapperClasses = clsx({
    "bg-digital-blue-dark text-white": messageType === "info",
    "bg-illuminating-dark": messageType === "warning",
    "bg-digital-green text-white": messageType === "success",
    "bg-foggy-light": messageType === "plain",
    "bg-digital-red text-white": messageType === "error",
  })

  const ElementWrapper = globalMessageConfig.suGlobalMsgHeader ? "article" : "div"

  return (
    <ElementWrapper
      {...props}
      className={twMerge("bg-fog-light", props.className)}
      aria-labelledby={globalMessageConfig.suGlobalMsgHeader ? id : undefined}
    >
      <div className="md:centered">
        <div
          className={twMerge(
            wrapperClasses,
            "flex w-full flex-col items-center gap-10 rounded-b-[25px] px-16 py-10 md:flex-row lg:w-3/4"
          )}
        >
          {globalMessageConfig.suGlobalMsgLabel && (
            <div className="flex shrink-0 items-center leading-none">{globalMessageConfig.suGlobalMsgLabel}:</div>
          )}
          <div>
            {globalMessageConfig.suGlobalMsgHeader && (
              <H2 id={id} className="mb-3 text-23">
                {globalMessageConfig.suGlobalMsgHeader}
              </H2>
            )}
            <Wysiwyg html={globalMessageConfig.suGlobalMsgMessage?.processed} />
          </div>

          {globalMessageConfig.suGlobalMsgLink?.url && (
            <ActionLink
              href={globalMessageConfig.suGlobalMsgLink.url}
              className={twMerge(
                "w-full max-w-fit no-underline hocus:underline",
                clsx({
                  "text-black": messageType === "warning",
                  "text-white hocus:text-white":
                    messageType === "info" || messageType === "error" || messageType === "success",
                })
              )}
            >
              {globalMessageConfig.suGlobalMsgLink.title}
            </ActionLink>
          )}
        </div>
      </div>
    </ElementWrapper>
  )
}

export default GlobalMessage
