import {HtmlHTMLAttributes} from "react";
import {ParagraphSumArcBanner} from "@lib/gql/__generated__/drupal";
import ArchBanner from "@components/patterns/arch-banner";
import {H2} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumArcBanner
}

const SumArcBannerParagraph = async ({paragraph, ...props}: Props) => {
  return (
    <div {...props}>
      <ArchBanner
        imageUrl={paragraph.sumArcImage?.mediaImage.url}
        imageAlt={paragraph.sumArcImage?.mediaImage.alt}
      >
        <div className="w-screen">
          <div className="flex flex-col justify-center items-center border-archway-dark border-b rs-pb-4 rs-mx-6">
            {paragraph.sumArcSuperhead &&
              <div className="font-sans font-normal rs-mb-0">
                {paragraph.sumArcSuperhead}
              </div>
            }
            <H2 className="font-normal max-w-[900px] font-roboto text-center rs-mb-0">
              {paragraph.sumArcHeadline}
            </H2>
            <Wysiwyg html={paragraph.sumArcDescription?.processed} className="max-w-400 mx-auto"/>
          </div>
        </div>
      </ArchBanner>

    </div>
  )
}
export default SumArcBannerParagraph