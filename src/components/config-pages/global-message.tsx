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

  const ElementWrapper = globalMessageConfig.suGlobalMsgHeader ? "article" : "div"

  return (
    <ElementWrapper
      {...props}
      className={twMerge("bg-fog-light", props.className)}
      aria-labelledby={globalMessageConfig.suGlobalMsgHeader ? id : undefined}
    >
      <div className="md:centered">
        <div className="flex w-full flex-col items-center gap-10 rounded-b-[25px] bg-illuminating-dark px-16 py-10 md:flex-row lg:w-3/4">
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
              className="w-full max-w-fit text-black no-underline hocus:underline"
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
