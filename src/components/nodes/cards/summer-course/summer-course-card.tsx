import {H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeSumSummerCourse} from "@lib/gql/__generated__/drupal.d"
import ImageCard from "@components/patterns/image-card"
import ActionLink from "@components/elements/action-link"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeSumSummerCourse
  headingLevel?: "h2" | "h3"
}

const SummerCourseCard = ({node, headingLevel, ...props}: Props) => {
  const Heading = headingLevel === "h3" ? H3 : H2

  return (
    <ImageCard
      {...props}
      aria-labelledby={node.id}
      isArticle
      imageUrl={node.sumCourseImage?.mediaImage.url}
      imageAlt={node.sumCourseImage?.mediaImage.alt}
    >
      <div className="flex flex-col">
        <Heading className="type-3 order-2 mb-0" id={node.id}>
          <ActionLink className="font-roboto font-normal" href={node.path || "#"}>
            {node.title}
          </ActionLink>
        </Heading>
        {node.sumCourseCatalogNumber && (
          <div className="rs-mb-0 order-1 font-normal">{node.sumCourseCatalogNumber}</div>
        )}
      </div>
    </ImageCard>
  )
}
export default SummerCourseCard
