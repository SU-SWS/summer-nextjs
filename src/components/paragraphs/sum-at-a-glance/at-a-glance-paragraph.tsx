import {ParagraphSumAtAGlance} from "@lib/gql/__generated__/drupal.d"
import {HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"
import {H2, H3} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {clsx} from "clsx"

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumAtAGlance
}

const SumAtAGlanceParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)

  const headingOnLeft = !!behaviors.sum_at_a_glance_behavior?.sum_at_a_glance_alignment

  return (
    <div {...props} className={twMerge("centered flex flex-col gap-20 @container", props.className)}>
      <div className="grid gap-y-10 @6xl:grid-cols-2">
        <div className="mt-auto h-fit">
          <div
            className={twMerge(
              "h-40 border-archway-dark border-opacity-50",
              clsx({
                "border-l-3": !headingOnLeft,
                "border-r-3": headingOnLeft,
              })
            )}
          />
          <div
            className={twMerge(
              "h-fit border-archway-dark border-opacity-50 p-20",
              clsx({
                "border-l-3": !headingOnLeft,
                "border-r-3": headingOnLeft,
              })
            )}
          >
            {paragraph.sumAtAGlanceHeadline && <H2 className="font-light">{paragraph.sumAtAGlanceHeadline}</H2>}
            <Wysiwyg html={paragraph.sumAtAGlanceDescrip?.processed} />
          </div>
        </div>
        <div
          className={twMerge(
            "items-ba grid grid-cols-1 md:grid-cols-2",
            clsx({
              "@6xl:order-first": !headingOnLeft,
            })
          )}
        >
          <div
            className={twMerge(
              "mt-auto border-archway-dark border-opacity-50",
              clsx({
                "border-l-3 md:h-80": !headingOnLeft,
                "h-40 border-r-3 md:h-60": headingOnLeft,
              })
            )}
          />
          <div
            className={twMerge(
              "mt-auto border-archway-dark border-opacity-50",
              clsx({
                "h-40 border-l-3 md:h-60": !headingOnLeft,
                "border-r-3 md:h-80": headingOnLeft,
              })
            )}
          />

          {paragraph.sumAtAGlanceFacts.map((fact, i) => (
            <div
              key={fact.id}
              className={twMerge(
                "border-archway-dark border-opacity-50 p-10",
                clsx({
                  "border-l-3": !headingOnLeft,
                  "border-r-3": headingOnLeft,
                  "md:order-last": i % 2 === 1,
                })
              )}
            >
              <H3 className="font-light">{fact.sumFactsLabel}</H3>
              <p>{fact.sumFactsText}</p>
            </div>
          ))}

          {paragraph.sumAtAGlanceFacts.length % 2 === 1 && (
            <div
              className={twMerge(
                "border-archway-dark border-opacity-50 p-10",
                clsx({
                  "border-l-3": !headingOnLeft,
                  "border-r-3": headingOnLeft,
                })
              )}
            />
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
  )
}

export default SumAtAGlanceParagraph
