import { ParagraphSumAtAGlance } from "@lib/gql/__generated__/drupal.d";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { H2, H3 } from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumAtAGlance;
};

const SumAtAGlanceParagraph = ({ paragraph, ...props }: Props) => {
  return (
    <div
      {...props}
      className={twMerge(
        "centered flex flex-col gap-20 @container",
        props.className,
      )}
    >
      <div className="grid @6xl:grid-cols-2">
        <div className="mt-auto h-fit border-l-3 border-archway-dark border-opacity-50 p-20">
          {paragraph.sumAtAGlanceHeadline && (
            <H2 className="font-light">{paragraph.sumAtAGlanceHeadline}</H2>
          )}
          <Wysiwyg html={paragraph.sumAtAGlanceDescrip?.processed} />
        </div>

        <div className="items-ba grid grid-cols-2 @6xl:order-first">
          <div className="h-80 border-l-3 border-archway-dark border-opacity-50" />
          <div className="mt-auto h-40 border-l-3 border-archway-dark border-opacity-50" />

          {paragraph.sumAtAGlanceFacts.map((fact) => (
            <div
              key={fact.id}
              className="border-l-3 border-archway-dark border-opacity-50 p-10"
            >
              <H3 className="font-light">{fact.sumFactsLabel}</H3>
              <p>{fact.sumFactsText}</p>
            </div>
          ))}

          {paragraph.sumAtAGlanceFacts.length % 2 === 1 && (
            <div className="border-l-3 border-archway-dark border-opacity-50 p-10" />
          )}
        </div>
      </div>

      {paragraph.sumAtAGlanceLink?.url && (
        <div>
          <Button href={paragraph.sumAtAGlanceLink.url} centered>
            {paragraph.sumAtAGlanceLink.title}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SumAtAGlanceParagraph;