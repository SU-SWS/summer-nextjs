import {HtmlHTMLAttributes} from "react"
import {ParagraphSumArcBanner} from "@lib/gql/__generated__/drupal.d"
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
      <ArcBanner imageUrl={paragraph.sumArcImage?.mediaImage.url} imageAlt={paragraph.sumArcImage?.mediaImage.alt}>
        <div className="w-screen">
          <div className="rs-mx-6 flex flex-col items-center justify-center">
            {paragraph.sumArcSuperhead && (
              <div className="rs-mb-0 font-sans font-normal">{paragraph.sumArcSuperhead}</div>
            )}
            <H1 className="rs-mb-0 max-w-[900px] text-center font-roboto font-normal">{pageTitle}</H1>
            <Wysiwyg html={paragraph.sumArcDescription?.processed} className="mx-auto max-w-[450px] text-center" />
            <div className="rs-mb-4 rs-py-4 centered w-full border-b border-archway-dark" />
          </div>
        </div>
      </ArcBanner>
    </div>
  )
}
export default SumArcBannerParagraph
