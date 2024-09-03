"use client"

import {HTMLAttributes, JSX, useEffect, useRef} from "react"
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
  const slideShowRef = useRef<HTMLDivElement>(null)

  const adjustSlideLinks = () => {
    // Set tabindex attributes based on if the slides are visible or not.
    const hiddenLinks = slideShowRef.current?.querySelectorAll(".slick-slide:not(.slick-active) a")
    if (hiddenLinks) {
      ;[...hiddenLinks].map(link => link.setAttribute("tabindex", "-1"))
    }

    const visibleLinks = slideShowRef.current?.querySelectorAll(".slick-slide.slick-active a")
    if (visibleLinks) {
      ;[...visibleLinks].map(link => link.removeAttribute("tabindex"))
    }
  }

  useEffect(() => {
    adjustSlideLinks()
  }, [])

  const settings: Settings = {
    afterChange: () => adjustSlideLinks(),
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
    <section
      ref={slideShowRef}
      {...props}
      aria-roledescription="carousel"
      className={twMerge("relative", props.className)}
    >
      <Slider {...settings}>{children}</Slider>
    </section>
  )
}

export default Slideshow
