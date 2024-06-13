import React, { ElementType, HtmlHTMLAttributes } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Maybe } from "@lib/gql/__generated__/drupal";
import { clsx } from "clsx";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>;
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>;
  /**
   * Is the banner supposed to be a section or a div.
   */
  isSection?: Maybe<boolean>;
  /**
   * Eagerly load the banner image.
   */
  eagerLoadImage?: Maybe<boolean>;
  /**
   * Position of the text over the image.
   */
  overlayPosition?: Maybe<"left" | "right">;
  /**
   * Additional card overlap classes
   */
  cardColorClasses?: Maybe<string>;
};

const HeroBanner = ({
  imageUrl,
  imageAlt,
  eagerLoadImage,
  isSection,
  overlayPosition,
  children,
  cardColorClasses,
  ...props
}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div";

  return (
    <BannerWrapper
      {...props}
      className={twMerge(
        "flex flex-col md:block rs-mb-5 @container md:min-h-[400px] relative left-1/2 w-screen -translate-x-1/2",
        props.className,
      )}
    >
      <div className="order-2 @6xl:aspect-auto relative aspect-[16/9] w-full bg-cool-grey @6xl:absolute @6xl:h-full">
        {imageUrl && (
          <Image
            className="object-cover"
            src={imageUrl}
            alt={imageAlt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
          />
        )}
      </div>

      {children && (
        <div
          className={twMerge(
            "order-1 rs-p-2 relative flex w-full flex-col shadow-lg bg-white @6xl:z-10 @6xl:w-1/2",
            clsx({
              "@6xl:ml-auto @6xl:mr-20": overlayPosition === "right",
              "@6xl:ml-20 @6xl:mr-auto": overlayPosition !== "right",
            }),
            cardColorClasses
          )}
        >
          {children}
        </div>
      )}
    </BannerWrapper>
  );
};
export default HeroBanner;
