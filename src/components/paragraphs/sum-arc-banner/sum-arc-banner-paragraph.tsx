import {HtmlHTMLAttributes} from "react";
import {ParagraphSumArcBanner} from "@lib/gql/__generated__/drupal";
import ArchBanner from "@components/patterns/arch-banner";
import {H1} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumArcBanner
  pageTitle: string
}

const SumArcBannerParagraph = async ({paragraph,pageTitle, ...props}: Props) => {
  return (
    <div {...props}>
      <ArchBanner
        imageUrl={paragraph.sumArcImage?.mediaImage.url}
        imageAlt={paragraph.sumArcImage?.mediaImage.alt}
      >
        <div className="w-screen mb-32">
          <div className="flex flex-col justify-center items-center border-archway-dark border-b rs-pb-4 rs-mx-6">
            {paragraph.sumArcSuperhead &&
              <div className="font-sans font-normal rs-mb-0">
                {paragraph.sumArcSuperhead}
              </div>
            }
            <H1 className="font-normal max-w-[900px] font-roboto text-center rs-mb-0">
              {pageTitle}
            </H1>
            <Wysiwyg html={paragraph.sumArcDescription?.processed} className="max-w-400 mx-auto text-center"/>
          </div>
        </div>
      </ArchBanner>

    </div>
  )
}
export default SumArcBannerParagraph