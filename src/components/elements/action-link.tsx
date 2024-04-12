import Link from "@components/elements/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HtmlHTMLAttributes<HTMLAnchorElement> & {
  /**
   * Link url.
   */
  href: string;
};

const ActionLink = ({ children, ...props }: Props) => {
  return (
    <Link {...props} className={twMerge("relative", props.className)}>
      {children}
      <ArrowRightIcon width={20} className='ml-2 inline-block' />
    </Link>
  );
};
export default ActionLink;
