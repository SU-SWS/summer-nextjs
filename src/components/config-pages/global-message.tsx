import {BellIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon} from "@heroicons/react/20/solid"
import {H2} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import {StanfordGlobalMessage} from "@lib/gql/__generated__/drupal.d"
import ActionLink from "@components/elements/action-link"
import {twMerge} from "tailwind-merge"
import clsx from "clsx"

const GlobalMessage = ({suGlobalMsgEnabled, suGlobalMsgType, suGlobalMsgHeader, suGlobalMsgLabel, suGlobalMsgLink, suGlobalMsgMessage}: StanfordGlobalMessage) => {
  if (!suGlobalMsgEnabled) return

  const wrapperClasses = clsx({
    "bg-digital-blue-dark text-white": suGlobalMsgType === "info",
    "bg-illuminating-dark": suGlobalMsgType === "warning",
    "bg-digital-green text-white": suGlobalMsgType === "success",
    "bg-foggy-light": suGlobalMsgType === "plain",
    "bg-digital-red text-white": suGlobalMsgType === "error",
  })

  return (
    <div className="bg-fog-light">
      <div className="md:centered">
        <div className={twMerge(wrapperClasses, "flex w-full flex-col items-center gap-10 rounded-b-[25px] px-16 py-10 md:flex-row lg:w-3/4")}>
          {suGlobalMsgLabel && (
            <div className="flex shrink-0 items-center leading-none">
              <MessageIcon messageType={suGlobalMsgType} />
              {suGlobalMsgLabel}:
            </div>
          )}
          <div>
            {suGlobalMsgHeader && <H2 className="mb-3 text-23">{suGlobalMsgHeader}</H2>}
            <Wysiwyg html={suGlobalMsgMessage?.processed} />
          </div>

          {suGlobalMsgLink?.url && (
            <ActionLink
              href={suGlobalMsgLink.url}
              className={twMerge(
                "w-full max-w-fit no-underline hocus:underline",
                clsx({
                  "text-black": suGlobalMsgType === "warning",
                  "text-white hocus:text-white": suGlobalMsgType === "info" || suGlobalMsgType === "error" || suGlobalMsgType === "success",
                })
              )}
            >
              {suGlobalMsgLink.title}
            </ActionLink>
          )}
        </div>
      </div>
    </div>
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
