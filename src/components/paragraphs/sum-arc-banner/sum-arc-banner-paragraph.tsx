import {HtmlHTMLAttributes} from "react"
import {ParagraphSumArcBanner} from "@lib/gql/__generated__/drupal"
import ArcBanner from "@components/patterns/arc-banner"
import {H1} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumArcBanner
  pageTitle: string
}

const SumArcBannerParagraph = async ({paragraph, pageTitle, ...props}: Props) => {
  return (
    <div {...props}>
      <ArchBanner
        imageUrl={paragraph.sumArcImage?.mediaImage.url}
        imageAlt={paragraph.sumArcImage?.mediaImage.alt}
      >
        <div className="mb-32 w-screen">
          <div className="rs-pb-4 rs-mx-6 flex flex-col items-center justify-center border-b border-archway-dark">
            {paragraph.sumArcSuperhead && <div className="rs-mb-0 font-sans font-normal">{paragraph.sumArcSuperhead}</div>}
            <H1 className="rs-mb-0 max-w-[900px] text-center font-roboto font-normal">{pageTitle}</H1>
            <Wysiwyg
              html={paragraph.sumArcDescription?.processed}
              className="mx-auto max-w-400 text-center"
            />
          </div>
        </div>
      </ArchBanner>
    </div>
  )
}
export default SumArcBannerParagraph
