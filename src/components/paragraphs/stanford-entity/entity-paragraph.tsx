import Wysiwyg from "@components/elements/wysiwyg"
import NodeCard from "@components/nodes/cards/node-card"
import Button from "@components/elements/button"
import {H2} from "@components/elements/headers"
import {ElementType, HtmlHTMLAttributes, Suspense} from "react"
import {NodeInterface, NodeUnion, ParagraphStanfordEntity} from "@lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {getEntityFromPath} from "@lib/gql/gql-queries"
import {ImageCardSkeleton} from "@components/patterns/image-card"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordEntity
}

const EntityParagraph = async ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const entities = paragraph.suEntityItem || []
  const gridCols = ["lg:grid-cols-3", "lg:grid-cols-1", "lg:grid-cols-2"]
  const gridClass = gridCols[entities.length >= 3 ? 0 : entities.length % 3]

  const EntityWrapper: ElementType =
    paragraph.suEntityHeadline && behaviors.stanford_teaser?.heading_behavior !== "remove" ? "section" : "div"

  return (
    <EntityWrapper
      {...props}
      className={twMerge("centered mb-20 flex flex-col gap-10 lg:max-w-[920px] xl:max-w-[980px]", props.className)}
      aria-labelledby={EntityWrapper === "section" ? paragraph.id : undefined}
    >
      {EntityWrapper === "section" && (
        <H2
          id={paragraph.id}
          className={twMerge("mb-0 text-center", behaviors.stanford_teaser?.heading_behavior === "hide" && "sr-only")}
        >
          {paragraph.suEntityHeadline}
        </H2>
      )}

      <Wysiwyg html={paragraph.suEntityDescription?.processed} />

      <div className={`grid ${gridClass} mb-20 gap-20 [&>*]:w-full`}>
        {entities.map(entity => (
          <Suspense key={`${paragraph.id}-${entity.id}`} fallback={<ImageCardSkeleton />}>
            <EntityCard path={entity.path} headingLevel={paragraph.suEntityHeadline ? "h3" : "h2"} />
          </Suspense>
        ))}
      </div>

      {paragraph.suEntityButton?.url && (
        <Button href={paragraph.suEntityButton.url} centered>
          {paragraph.suEntityButton.title}
        </Button>
      )}
    </EntityWrapper>
  )
}

const EntityCard = async ({path, headingLevel}: {path: NodeInterface["path"]; headingLevel: "h3" | "h2"}) => {
  if (!path) return
  const queryResponse = await getEntityFromPath<NodeUnion>(path, false, true)
  if (!queryResponse.entity) return
  return <NodeCard node={queryResponse.entity} headingLevel={headingLevel} />
}

export default EntityParagraph
