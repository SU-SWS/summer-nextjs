import Link from "@components/elements/link"
import {H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeSumSummerCourse} from "@lib/gql/__generated__/drupal.d"
import ImageCard from "@components/patterns/image-card"

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
      <Heading className="type-3" id={node.id}>
        <Link href={node.path}>{node.title}</Link>
      </Heading>
    </ImageCard>
  )
}
export default SummerCourseCard
