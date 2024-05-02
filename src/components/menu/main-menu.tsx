"use client";

import Link from "@components/elements/link";
import SiteSearchForm from "@components/search/site-search-form";
import useActiveTrail from "@lib/hooks/useActiveTrail";
import useOutsideClick from "@lib/hooks/useOutsideClick";
import { ArrowRightIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { MenuItem as MenuItemType, StanfordBasicSiteSetting } from "@lib/gql/__generated__/drupal.d";
import { clsx } from "clsx";
import { useBoolean, useEventListener } from "usehooks-ts";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Button from "@components/elements/button";

const menuLevelsToShow = 2;

type Props = {
  /**
   * Array of nested menu items.
   */
  menuItems: MenuItemType[];
  sumSiteHeaderPrim?: StanfordBasicSiteSetting["sumSiteHeaderPrim"];
  sumSiteHeaderSec?: StanfordBasicSiteSetting["sumSiteHeaderSec"];
};

const MainMenu = ({ menuItems, ...siteSettingsConfig}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navId = useId();

  const { value: menuOpen, setFalse: closeMenu, toggle: toggleMenu } = useBoolean(false);
  const browserUrl = usePathname();
  const activeTrail = useActiveTrail(menuItems, usePathname() || "");

  useOutsideClick(menuRef, closeMenu);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menuOpen) return;

      closeMenu();
      buttonRef.current?.focus();
    },
    [menuOpen, closeMenu]
  );

  useEffect(() => closeMenu(), [browserUrl, closeMenu]);
  useEventListener("keydown", handleEscape, menuRef);

  return (
    <nav
      id={navId}
      aria-label="Main Navigation"
      className="lg:centered"
      ref={menuRef}
    >
      <button
        ref={buttonRef}
        className="flex flex-col items-center lg:hidden absolute top-5 right-10 rs-py-2 group"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-labelledby={navId}
      >
        <span className="flex flex-col justify-center items-center w-[30px] h-[30px]">
          <span
            className={clsx(
              "bg-black-true block transition-all duration-300 ease-out h-[3px] w-full rounded-sm",
              {
                "rotate-45 translate-y-4": menuOpen,
                "-translate-y-0.5": !menuOpen,
              }
            )}
          />
          <span
            className={clsx(
              "bg-black-true block transition-all duration-300 ease-out h-[3px] w-full rounded-sm my-3",
              { "opacity-0": menuOpen, "opacity-100": !menuOpen }
            )}
          />
          <span
            className={clsx(
              "bg-black-true block transition-all duration-300 ease-out h-[3px] w-full rounded-sm",
              {
                "-rotate-45 -translate-y-4": menuOpen,
                "translate-y-0.5": !menuOpen,
              }
            )}
          />
        </span>
        <span className="group-hocus:underline" aria-hidden>
          {menuOpen ? "Close" : "Menu"}
        </span>
      </button>

      <div className={clsx(menuOpen ? "block" : "hidden", "lg:flex lg:justify-end lg:items-center bg-fog-light lg:bg-transparent absolute top-100 lg:relative z-10 w-full")}>
        <SiteSearchForm className="px-10 lg:hidden" />
        <div className="border-b border-spirited-light flex flex-col items-center mt-10 lg:hidden children:w-full children:centered">
          {siteSettingsConfig && siteSettingsConfig.sumSiteHeaderSec && <Button href={siteSettingsConfig.sumSiteHeaderSec.url} secondary>{siteSettingsConfig.sumSiteHeaderSec.title}</Button>}
          {siteSettingsConfig && siteSettingsConfig.sumSiteHeaderPrim && <Button href={siteSettingsConfig.sumSiteHeaderPrim.url}>{siteSettingsConfig.sumSiteHeaderPrim.title}</Button>}
        </div>
        <ul className="list-unstyled lg:flex lg:justify-end flex-wrap m-0 p-0">
          {menuItems.map((item) =>
            <MenuItem
              key={item.id}
              {...item}
              activeTrail={activeTrail}
              level={0}
            />
          )}

          <li className="hidden lg:block mb-0 pb-0">
            <Link id="search" href="/search" prefetch={false} className="h-full inline-block no-underline border-b-[4px] border-transparent px-5 pt-5 pb-10 border-b-[4px] hocus:border-spirited-light">
              <MagnifyingGlassIcon width={25} className="text-archway-dark" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

type MenuItemProps = MenuItemType & {
  activeTrail: string[];
  level: number;
};

const MenuItem = ({
  id,
  url,
  title,
  activeTrail,
  children,
  level,
}: MenuItemProps) => {
  const linkId = useId();
  const menuItemRef = useRef<HTMLLIElement>(null);
  const belowListRef = useRef<HTMLUListElement>(null);

  const [positionRight, setPositionRight] = useState<boolean>(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    value: submenuOpen,
    setFalse: closeSubmenu,
    toggle: toggleSubmenu,
  } = useBoolean(false);
  const browserUrl = usePathname();

  useOutsideClick(menuItemRef, closeSubmenu);

  // Close the submenu if the url changes.
  useEffect(() => closeSubmenu(), [browserUrl, closeSubmenu]);

  useLayoutEffect(() => {
    // If the right side of the submenu is not visible, set the position to be on the left of the menu item.
    const { x, width } = belowListRef.current?.getBoundingClientRect() || {
      x: 0,
      width: 0,
    };
    if (x + width > window.innerWidth) setPositionRight(false);
  }, [submenuOpen]);

  // If the user presses escape on the keyboard, close the submenus.
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !submenuOpen) return;

      closeSubmenu();
      if (level === 0) buttonRef.current?.focus();
    },
    [level, submenuOpen, closeSubmenu]
  );

  useEventListener("keydown", handleEscape, menuItemRef);

  // List out the specific classes so tailwind will include them. Dynamic classes values don"t get compiled.
  const zIndexes = ["z-[1]", "z-[2]", "z-[3]", "z-[4]", "z-[5]"]
  const leftPadding = ["pl-10", "pl-20", "pl-28", "pl-48"]

  // The last item in the current trail would be the current item id if the user is on that page.
  const isCurrent = activeTrail.at(-1) === id;
  const inTrail = activeTrail.includes(id) && !isCurrent;

  const linkStyles = clsx(
    "group w-full relative inline-block font-normal text-black hocus:text-black no-underline py-5 border-b-[4px] hocus:border-spirited-light",
    leftPadding[level],
    // Top menu item styles.
    {
      "lg:border-l-0 lg:border-b-[4px] lg:mr-0 lg:pb-10": level === 0,
      "border-spirited-light": level === 0 && isCurrent,
      "border-transparent lg:border-spirited-light":
        level === 0 && !isCurrent && inTrail,
      "border-transparent": level === 0 && !isCurrent && !inTrail,
      "lg:pr-10" : level === 0 && children.length === 0,
    },
    // Child menu item styles.
    {
      "ml-5 lg:ml-0 lg:pl-5": level !== 0,
      "border-spirited-light": level !== 0 && isCurrent,
      "border-transparent": level !== 0 && !isCurrent,
    }
  );

  const chevronBtnStyles = clsx(
    "shrink-0 relative pr-10 lg:right-0 text-black bg-transparent lg:bg-transparent lg:pr-5 lg:pb-6 lg:pl-2 hocus:border-b-[4px] lg:group-hover:border-b-[4px] hocus:border-spirited-light lg:group-hover:border-spirited-light",
    // Top menu item styles.
    {
      "border-b-[4px]": level === 0,
      "border-spirited-light": level === 0 && isCurrent,
      "border-transparent lg:border-spirited-light":
        level === 0 && !isCurrent && inTrail,
      "border-transparent": level === 0 && !isCurrent && !inTrail,
    },
  );

  const subMenuStyles = clsx(
    "list-unstyled w-full min-w-[350px] lg:bg-fog-light lg:border lg:border-white lg:shadow-2xl lg:absolute lg:rounded-[25px] lg:px-12 lg:py-4 lg:mt-3",
    zIndexes[level],
    {
      "lg:top-full lg:right-0": level === 0,
      "lg:top-0": level !== 0,
      "lg:left-full": level !== 0 && positionRight,
      "lg:right-full": level !== 0 && !positionRight,
      block: submenuOpen,
      hidden: !submenuOpen,
    }
  );

  return (
    <li
      ref={menuItemRef}
      className={clsx(
        "m-0 lg:py-0 relative border-b last:border-0 border-spirited-light lg:relative",
        { "lg:border-b-0 first:border-t-0 lg:mr-10 lg:last:mr-0": level === 0 }
      )}
    >
      <div className="group flex lg:justify-end">
        <Link
          id={linkId}
          href={url || "#"}
          className={linkStyles}
          aria-current={isCurrent ? "true" : undefined}
        >
          {title}
          {level !== 0 && <ArrowRightIcon width={20} className="hidden group-focus:inline-block group-hover:inline-block ml-2" />}
        </Link>

        {children.length > 0 && level < menuLevelsToShow &&
          <button
            ref={buttonRef}
            className={chevronBtnStyles}
            onClick={toggleSubmenu}
            aria-expanded={submenuOpen}
            aria-labelledby={linkId}
          >
            <ChevronDownIcon
              height={25}
              className={clsx(
                "transition group-hocus:scale-125 group-hocus:text-black ease-in-out duration-150",
                { "rotate-180": submenuOpen }
              )}
            />
          </button>
        }
      </div>

      {children.length > 0 && level < menuLevelsToShow &&
        <ul className={subMenuStyles} ref={belowListRef}>
          {children.map((item) =>
            <MenuItem
              key={item.id}
              {...item}
              level={level + 1}
              activeTrail={activeTrail}
            />
          )}
        </ul>
      }
    </li>
  );
};

export default MainMenu;
