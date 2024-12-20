import Wysiwyg from "@components/elements/wysiwyg"
import {SummerGlobalMsg} from "@lib/gql/__generated__/drupal.d"
import ActionLink from "@components/elements/action-link"
import {twMerge} from "tailwind-merge"
import {HTMLAttributes} from "react"
import {H2} from "@components/elements/headers"
import {unstable_cache as nextCache} from "next/cache"
import {graphqlClient} from "@lib/gql/gql-client"

type Props = HTMLAttributes<HTMLElement> & {}

const getGlobalMessage = nextCache(
  async (): Promise<SummerGlobalMsg | undefined> => {
    const messages = await graphqlClient().GlobalMessages()
    if (messages.summerGlobalMsgs.nodes?.[0]?.label) return messages.summerGlobalMsgs.nodes[0] as SummerGlobalMsg
  },
  [],
  {tags: ["global-message"]}
)

const GlobalMessage = async ({...props}: Props) => {
  const globalMessageConfig = await getGlobalMessage()
  if (!globalMessageConfig) return

  return (
    <article {...props} className={twMerge("bg-fog-light", props.className)} aria-labelledby={globalMessageConfig.id}>
      <div className="md:centered">
        <div className="flex w-full flex-col items-center justify-between gap-10 rounded-b-[25px] bg-illuminating-dark px-16 py-10 md:flex-row lg:w-3/4">
          <div>
            <H2 id={globalMessageConfig.id} className="mb-3 text-23">
              {globalMessageConfig.label}
            </H2>
            <Wysiwyg html={globalMessageConfig.sumGlobalMsgBody?.processed} />
          </div>

          {globalMessageConfig.sumGlobalMsgLink?.url && (
            <ActionLink
              href={globalMessageConfig.sumGlobalMsgLink.url}
              className="w-full max-w-fit text-black no-underline hocus:underline"
            >
              {globalMessageConfig.sumGlobalMsgLink.title}
            </ActionLink>
          )}
        </div>
      </div>
    </article>
  )
}

export default GlobalMessage
