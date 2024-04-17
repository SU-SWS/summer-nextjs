import { H2 } from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import Link from "@components/elements/link";
import { clsx } from "clsx";
import { StanfordGlobalMessage } from "@lib/gql/__generated__/drupal.d";

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
      <div className='centered'>
        <div
          className={
            wrapperClasses +
            " px-16 py-10 rounded w-fit flex flex-col items-center md:flex-row gap-10"
          }
        >
          <div>
            {suGlobalMsgHeader && (
              <H2 className='text-23 mb-3'>{suGlobalMsgHeader}</H2>
            )}
            <Wysiwyg html={suGlobalMsgMessage?.processed} />
          </div>

          {suGlobalMsgLink?.url && (
            <Link href={suGlobalMsgLink.url} className='link--action'>
              {suGlobalMsgLink.title}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalMessage;
