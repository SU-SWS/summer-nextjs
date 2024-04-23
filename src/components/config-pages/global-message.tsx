import { H2 } from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import { clsx } from "clsx";
import { StanfordGlobalMessage } from "@lib/gql/__generated__/drupal.d";
import ActionLink from "@components/elements/action-link";

const GlobalMessage = ({
  suGlobalMsgEnabled,
  suGlobalMsgType,
  suGlobalMsgHeader,
  suGlobalMsgLink,
  suGlobalMsgMessage,
}: StanfordGlobalMessage) => {
  if (!suGlobalMsgEnabled) return;

  const wrapperClasses = clsx({
    "bg-digital-blue-dark text-white": suGlobalMsgType === "info",
    "bg-illuminating-dark": suGlobalMsgType === "warning",
    "bg-digital-green text-white": suGlobalMsgType === "success",
    "bg-foggy-light": suGlobalMsgType === "plain",
    "bg-digital-red text-white": suGlobalMsgType === "error",
  });

  return (
    <div className='bg-fog-light'>
      <div className='md:centered'>
        <div
          className={
            wrapperClasses +
            " px-16 py-10 rounded-b-[25px] w-full lg:w-3/4 flex flex-col md:flex-row items-center gap-10"
          }
        >
          {suGlobalMsgLabel && (
            <div className="flex items-center leading-none shrink-0">
              <MessageIcon messageType={suGlobalMsgType} />
              {suGlobalMsgLabel}:
            </div>
          )}
          <div>
            {suGlobalMsgHeader && (
              <H2 className='text-23 mb-3'>{suGlobalMsgHeader}</H2>
            )}
            <Wysiwyg html={suGlobalMsgMessage?.processed} />
          </div>

          {suGlobalMsgLink?.url && (
            <ActionLink href={suGlobalMsgLink.url} className="w-full max-w-fit">
              {suGlobalMsgLink.title}
            </ActionLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalMessage;
