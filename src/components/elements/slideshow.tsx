"use client";

import {HTMLAttributes, JSX} from "react";
import Slider, {CustomArrowProps, Settings} from "react-slick";
import {ArrowLongRightIcon, ArrowLongLeftIcon} from "@heroicons/react/16/solid";
import {twMerge} from "tailwind-merge";
import {clsx} from "clsx";


const NextArrow = ({className, onClick}: CustomArrowProps) => {
  const slickDisabled = !!(className && className?.indexOf("slick-disabled") > 0);
  return (
    <button
      className="absolute top-1/2 right-5 z-50 w-20 h-20 bg-digital-red rounded-full flex justify-around border-2 border-white hocus:outline hocus:outline-3 hocus:outline-digital-red"
      onClick={onClick}
      aria-label="Next"
      disabled={slickDisabled}
    >
      <ArrowLongRightIcon width={40} className={twMerge("text-white", clsx({"text-fog-dark": slickDisabled}))}/>
    </button>
  );
};

const PrevArrow = ({className, onClick}: CustomArrowProps) => {
  const slickDisabled = !!(className && className?.indexOf("slick-disabled") > 0);
  return (
    <button
      className="absolute top-1/2 left-5 z-50 w-20 h-20 bg-digital-red rounded-full flex justify-around border-2 border-white hocus:outline hocus:outline-3 hocus:outline-digital-red"
      onClick={onClick}
      aria-label="Previous"
      disabled={slickDisabled}
    >
      <ArrowLongLeftIcon width={40} className={twMerge("text-white", clsx({"text-fog-dark": slickDisabled}))}/>
    </button>
  );
};

type SlideshowProps = HTMLAttributes<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[];
  slideshowProps?: Omit<Settings, "children">;
}

// Slide padding styles are added in the tailwind index.css file.
const Slideshow = ({children, slideshowProps, ...props}: SlideshowProps) => {
  const settings: Settings = {
    autoplay: false,
    centerMode: false,
    className: "[&_.slick-track]:flex [&_.slick-track] [&_.slick-slider]:relative [&_.slick-slide>div]:h-full [&_.slick-slide>div>div]:h-full",
    dots: false,
    infinite: false,
    initialSlide: 0,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
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
  };
  return (
    <div {...props} className={twMerge("relative", props.className)}>
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default Slideshow;
