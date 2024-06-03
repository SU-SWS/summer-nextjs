import React, { HtmlHTMLAttributes } from "react";
import { ParagraphSumTopBanner } from "@lib/gql/__generated__/drupal.d";
import { H2, H3, H4 } from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import Button from "@components/elements/button";
import { getParagraphBehaviors } from "@components/paragraphs/get-paragraph-behaviors";
import { twMerge } from "tailwind-merge";
import HeroBanner from "@components/patterns/hero-banner";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumTopBanner;
  eagerLoadImage?: boolean;
};

const SumTopBannerParagraph = ({
  paragraph,
  eagerLoadImage,
  ...props
}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph);
  const hasCard =
    paragraph.sumTopBannerSuperhead ||
    paragraph.sumTopBannerLink ||
    paragraph.sumTopBannerDescrip ||
    paragraph.sumTopBannerHeadline;

  const headerTagChoice = (behaviors.hero_pattern?.heading || "h2").split(
    ".",
    2,
  );
  const headerTag = headerTagChoice[0];
  const headerClasses = headerTagChoice[1]
    ?.replace(".", " ")
    .replace("su-font-splash", "text-m2 font-bold");

  return (
    <HeroBanner
      {...props}
      aria-labelledby={
        paragraph.sumTopBannerHeadline ? paragraph.id : undefined
      }
      imageUrl={paragraph.sumTopBannerImage?.mediaImage.url}
      imageAlt={paragraph.sumTopBannerImage?.mediaImage.alt}
      isSection={!!paragraph.sumTopBannerHeadline}
      overlayPosition={behaviors.hero_pattern?.overlay_position}
      eagerLoadImage={eagerLoadImage}
    >
      {hasCard && (
        <>
          {paragraph.sumTopBannerHeadline && (
            <div
              id={paragraph.id}
              className={twMerge(
                "order-2",
                behaviors.hero_pattern?.hide_heading && "sr-only",
              )}
            >
              {headerTag === "h2" && (
                <H2 className={twMerge(headerClasses, "mb-0")}>
                  {paragraph.sumTopBannerHeadline}
                </H2>
              )}
              {headerTag === "h3" && (
                <H3 className={headerClasses}>
                  {paragraph.sumTopBannerHeadline}
                </H3>
              )}
              {headerTag === "h4" && (
                <H4 className={headerClasses}>
                  {paragraph.sumTopBannerHeadline}
                </H4>
              )}
              {headerTag === "div" && (
                <div className={headerClasses}>
                  {paragraph.sumTopBannerHeadline}
                </div>
              )}
            </div>
          )}

          {paragraph.sumTopBannerSuperhead && (
            <div className="order-1 text-09em font-semibold">
              {paragraph.sumTopBannerSuperhead}
            </div>
          )}

          <Wysiwyg
            html={paragraph.sumTopBannerDescrip?.processed}
            className="order-3 text-m0"
          />

          {paragraph.sumTopBannerLink?.url && (
            <div className="order-4">
              <Button href={paragraph.sumTopBannerLink.url}>
                {paragraph.sumTopBannerLink.title}
              </Button>
            </div>
          )}
        </>
      )}
    </HeroBanner>
  );
};
export default SumTopBannerParagraph;
