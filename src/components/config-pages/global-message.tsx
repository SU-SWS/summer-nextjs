import {BellIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon} from "@heroicons/react/20/solid"
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

  const wrapperClasses = clsx({
    "bg-digital-blue-dark text-white": globalMessageConfig.suGlobalMsgType === "info",
    "bg-illuminating-dark": globalMessageConfig.suGlobalMsgType === "warning",
    "bg-digital-green text-white": globalMessageConfig.suGlobalMsgType === "success",
    "bg-foggy-light": globalMessageConfig.suGlobalMsgType === "plain",
    "bg-digital-red text-white": globalMessageConfig.suGlobalMsgType === "error",
  })

  return (
    <article
      {...props}
      className={twMerge("bg-fog-light", props.className)}
      aria-labelledby={id}
    >
      <div className="md:centered">
        <div className={twMerge(wrapperClasses, "flex w-full flex-col items-center gap-10 rounded-b-[25px] px-16 py-10 md:flex-row lg:w-3/4")}>
          {globalMessageConfig.suGlobalMsgLabel && (
            <div className="flex shrink-0 items-center leading-none">
              <MessageIcon messageType={globalMessageConfig.suGlobalMsgType} />
              {globalMessageConfig.suGlobalMsgLabel}:
            </div>
          )}
          <div>
            {globalMessageConfig.suGlobalMsgHeader && (
              <H2
                id={id}
                className="mb-3 text-23"
              >
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
                  "text-black": globalMessageConfig.suGlobalMsgType === "warning",
                  "text-white hocus:text-white": globalMessageConfig.suGlobalMsgType === "info" || globalMessageConfig.suGlobalMsgType === "error" || globalMessageConfig.suGlobalMsgType === "success",
                })
              )}
            >
              {globalMessageConfig.suGlobalMsgLink.title}
            </ActionLink>
          )}
        </div>
      </div>
    </article>
  )
}

const MessageIcon = ({messageType}: {messageType: StanfordGlobalMessage["suGlobalMsgType"]}) => {
  switch (messageType) {
    case "info":
      return <InformationCircleIcon width={40} />
    case "success":
      return <CheckCircleIcon width={40} />
    case "plain":
      return <BellIcon width={40} />
  }
  return <ExclamationTriangleIcon width={40} />
}

export default GlobalMessage
