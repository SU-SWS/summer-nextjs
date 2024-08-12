"use client"

import {HTMLAttributes, JSX} from "react"
import Slider, {CustomArrowProps, Settings} from "react-slick"
import {ArrowLongRightIcon, ArrowLongLeftIcon} from "@heroicons/react/16/solid"
import {twMerge} from "tailwind-merge"
import {clsx} from "clsx"

const NextArrow = ({className, onClick}: CustomArrowProps) => {
  const slickDisabled = className?.includes("slick-disabled")
  return (
    <button
      className={twMerge(
        "hocus:outline-3 absolute right-5 top-1/2 z-50 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-digital-red hocus:outline hocus:outline-digital-red",
        clsx({"bg-black-40 hocus:bg-black-40 hocus:outline-0": slickDisabled})
      )}
      onClick={onClick}
      aria-label="Next"
      disabled={slickDisabled}
    >
      <ArrowLongRightIcon width={40} className="text-white" />
    </button>
  )
}

const PrevArrow = ({className, onClick}: CustomArrowProps) => {
  const slickDisabled = className?.includes("slick-disabled")
  return (
    <button
      className={twMerge(
        "hocus:outline-3 absolute left-5 top-1/2 z-50 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-digital-red hocus:outline hocus:outline-digital-red",
        clsx({"bg-black-40 hocus:bg-black-40 hocus:outline-0": slickDisabled})
      )}
      onClick={onClick}
      aria-label="Previous"
      disabled={slickDisabled}
    >
      <ArrowLongLeftIcon width={40} className="text-white" />
    </button>
  )
}

type SlideshowProps = HTMLAttributes<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[]
  slideshowProps?: Omit<Settings, "children">
}

// Slide padding styles are added in the tailwind index.css file.
const Slideshow = ({children, slideshowProps, ...props}: SlideshowProps) => {
  const settings: Settings = {
    autoplay: false,
    centerMode: false,
    className:
      "[&_.slick-track]:flex [&_.slick-track] [&_.slick-slider]:relative [&_.slick-slide>div]:h-full [&_.slick-slide>div>div]:h-full",
    dots: false,
    infinite: false,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToScroll: 1,
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
    ...slideshowProps,
  }
  return (
    <div {...props} className={twMerge("relative", props.className)}>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

export default Slideshow
