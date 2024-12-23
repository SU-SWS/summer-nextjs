"use client"

import Link from "@components/elements/link"
import SiteSearchForm from "@components/search/site-search-form"
import {getMenuActiveTrail} from "@lib/drupal/utils"
import useOutsideClick from "@lib/hooks/useOutsideClick"
import {ArrowRightIcon, ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import {MenuItem as MenuItemType, StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import {clsx} from "clsx"
import {useBoolean, useEventListener} from "usehooks-ts"
import {RefObject, useCallback, useEffect, useId, useLayoutEffect, useRef, useState} from "react"
import {usePathname} from "next/navigation"
import Button from "@components/elements/button"
import {twMerge} from "tailwind-merge"

const menuLevelsToShow = 2

type Props = {
  /**
   * Array of nested menu items.
   */
  menuItems: MenuItemType[]
  sumSiteHeaderPrim?: StanfordBasicSiteSetting["sumSiteHeaderPrim"]
  sumSiteHeaderSec?: StanfordBasicSiteSetting["sumSiteHeaderSec"]
}

const MainMenuClient = ({menuItems, sumSiteHeaderPrim, sumSiteHeaderSec}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const navId = useId()

  const {value: menuOpen, setFalse: closeMenu, toggle: toggleMenu} = useBoolean(false)
  const browserUrl = usePathname()
  const activeTrail = getMenuActiveTrail(menuItems, usePathname() || "")

  useOutsideClick(menuRef, closeMenu)

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menuOpen) return

      closeMenu()
      buttonRef.current?.focus()
    },
    [menuOpen, closeMenu]
  )

  useEffect(() => closeMenu(), [browserUrl, closeMenu])
  useEventListener("keydown", handleEscape, menuRef as RefObject<HTMLDivElement>)

  return (
    <nav id={navId} aria-label="Main Navigation" className="lg:centered" ref={menuRef}>
      <button
        ref={buttonRef}
        className="group rs-py-2 absolute right-10 top-5 flex flex-col items-center lg:hidden"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close Main Navigation Menu" : "Open Main Navigation Menu"}
      >
        <span className="flex h-[30px] w-[30px] flex-col items-center justify-center">
          <span
            className={twMerge(
              "block h-[3px] w-full rounded-sm bg-black-true transition-all duration-300 ease-out",
              clsx({
                "translate-y-4 rotate-45": menuOpen,
                "-translate-y-0.5": !menuOpen,
              })
            )}
          />
          <span
            className={twMerge(
              "my-3 block h-[3px] w-full rounded-sm bg-black-true transition-all duration-300 ease-out",
              clsx({
                "opacity-0": menuOpen,
                "opacity-100": !menuOpen,
              })
            )}
          />
          <span
            className={twMerge(
              "block h-[3px] w-full rounded-sm bg-black-true transition-all duration-300 ease-out",
              clsx({
                "-translate-y-4 -rotate-45": menuOpen,
                "translate-y-0.5": !menuOpen,
              })
            )}
          />
        </span>
        <span className="group-hocus:underline" aria-hidden>
          {menuOpen ? "Close" : "Menu"}
        </span>
      </button>

      <div
        className={twMerge(
          "top-100 absolute z-10 block w-full bg-fog-light lg:relative lg:flex lg:items-center lg:justify-end lg:bg-transparent",
          clsx({"tw-hidden": !menuOpen})
        )}
      >
        <SiteSearchForm className="px-10 lg:hidden" />
        <div className="mt-10 flex flex-col items-center border-b border-[#F26845] children:centered children:w-full lg:hidden">
          {sumSiteHeaderSec && (
            <Button href={sumSiteHeaderSec.url} secondary>
              {sumSiteHeaderSec.title}
            </Button>
          )}
          {sumSiteHeaderPrim && <Button href={sumSiteHeaderPrim.url}>{sumSiteHeaderPrim.title}</Button>}
        </div>
        <ul className="list-unstyled m-0 flex-wrap p-0 lg:flex lg:justify-end">
          {menuItems.map(item => (
            <MenuItem key={item.id} {...item} activeTrail={activeTrail} level={0} />
          ))}

          <li className="tw-hidden mb-0 pb-0 lg:block">
            <Link
              id="search"
              href="/search"
              prefetch={false}
              className="inline-block h-full border-b-[4px] border-transparent px-5 pb-10 pt-5 no-underline hocus:border-[#F26845]"
              aria-label="Search Summer Session"
            >
              <MagnifyingGlassIcon width={25} className="text-archway-dark" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

type MenuItemProps = MenuItemType & {
  activeTrail: string[]
  level: number
}

const MenuItem = ({id, url, title, activeTrail, children, level}: MenuItemProps) => {
  const linkId = useId()
  const menuItemRef = useRef<HTMLLIElement>(null)
  const belowListRef = useRef<HTMLUListElement>(null)

  const [positionRight, setPositionRight] = useState<boolean>(true)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const {value: submenuOpen, setFalse: closeSubmenu, toggle: toggleSubmenu} = useBoolean(false)
  const browserUrl = usePathname()

  useOutsideClick(menuItemRef, closeSubmenu)

  // Close the submenu if the url changes.
  useEffect(() => closeSubmenu(), [browserUrl, closeSubmenu])

  useLayoutEffect(() => {
    // If the right side of the submenu is not visible, set the position to be on the left of the menu item.
    const {x, width} = belowListRef.current?.getBoundingClientRect() || {
      x: 0,
      width: 0,
    }
    if (x + width > window.innerWidth) setPositionRight(false)
  }, [submenuOpen])

  // If the user presses escape on the keyboard, close the submenus.
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !submenuOpen) return

      closeSubmenu()
      if (level === 0) buttonRef.current?.focus()
    },
    [level, submenuOpen, closeSubmenu]
  )

  useEventListener("keydown", handleEscape, menuItemRef as unknown as RefObject<HTMLDivElement>)

  // The last item in the current trail would be the current item id if the user is on that page.
  const isCurrent = activeTrail.at(-1) === id
  const inTrail = activeTrail.includes(id) && !isCurrent

  const linkStyles = twMerge(
    "group w-full relative flex flex-row font-normal text-black hocus:text-black no-underline py-5 border-b-[4px] hocus:border-[#F26845]",
    clsx(
      {
        "pl-10": level === 0,
        "pl-20": level === 1,
        "pl-28": level === 2,
        "pl-48": level === 3,
      },
      // Top menu item styles.
      {
        "lg:border-l-0 lg:border-b-[4px] lg:mr-0 lg:pb-10": level === 0,
        "border-[#F26845]": level === 0 && isCurrent,
        "border-transparent lg:border-[#F26845]": level === 0 && !isCurrent && inTrail,
        "border-transparent": level === 0 && !isCurrent && !inTrail,
        "lg:pr-10": level === 0 && children.length === 0,
      },
      // Child menu item styles.
      {
        "ml-5 lg:ml-0 lg:pl-5": level !== 0,
        "border-[#F26845]": level !== 0 && isCurrent,
        "border-transparent": level !== 0 && !isCurrent,
      }
    )
  )

  const chevronBtnStyles = clsx(
    "shrink-0 relative px-10 lg:right-0 text-black bg-transparent lg:bg-transparent lg:pr-5 lg:pb-6 lg:pl-2 hocus:border-b-[4px] lg:group-hover:border-b-[4px] hocus:border-[#F26845] lg:group-hover:border-[#F26845]",
    // Top menu item styles.
    {
      "border-b-[4px]": level === 0,
      "border-[#F26845]": level === 0 && isCurrent,
      "border-transparent lg:border-[#F26845]": level === 0 && !isCurrent && inTrail,
      "border-transparent": level === 0 && !isCurrent && !inTrail,
    }
  )

  const subMenuStyles = twMerge(
    "list-unstyled w-full min-w-[350px] lg:bg-fog-light lg:border lg:border-white lg:shadow-2xl lg:absolute lg:rounded-[25px] lg:px-12 lg:py-4 lg:mt-3",
    clsx(
      {
        "z-[1]": level === 0,
        "z-[2]": level === 1,
        "z-[3]": level === 2,
        "z-[4]": level === 3,
        "z-[5]": level === 4,
      },
      {
        "lg:top-full lg:left-0": level === 0,
        "lg:top-0": level !== 0,
        "lg:left-full": level !== 0 && positionRight,
        "lg:right-full": level !== 0 && !positionRight,
        block: submenuOpen,
        "tw-hidden": !submenuOpen,
      }
    )
  )

  return (
    <li
      ref={menuItemRef}
      className={twMerge(
        "relative m-0 border-b border-[#F26845] last:border-0 lg:relative lg:py-0",
        clsx({
          "first:border-t-0 lg:mr-10 lg:border-b-0 lg:last:mr-0": level === 0,
          "hocus:border-transparent": level !== 0,
        })
      )}
    >
      <div className="group flex lg:justify-end">
        <Link id={linkId} href={url || "#"} className={linkStyles} aria-current={isCurrent ? "true" : undefined}>
          {title}
          {level !== 0 && (
            <ArrowRightIcon
              width={20}
              className="ml-2 text-transparent group-hover:text-black group-focus:text-black"
            />
          )}
        </Link>

        {children.length > 0 && level < menuLevelsToShow && (
          <button
            ref={buttonRef}
            className={chevronBtnStyles}
            onClick={toggleSubmenu}
            aria-expanded={submenuOpen}
            aria-labelledby={linkId}
          >
            <ChevronDownIcon
              height={25}
              className={twMerge(
                "transition duration-150 ease-in-out group-hocus:scale-125 group-hocus:text-black",
                clsx({
                  "rotate-180": submenuOpen,
                })
              )}
            />
          </button>
        )}
      </div>

      {children.length > 0 && level < menuLevelsToShow && (
        <ul className={subMenuStyles} ref={belowListRef}>
          {children.map(item => (
            <MenuItem key={item.id} {...item} level={level + 1} activeTrail={activeTrail} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default MainMenuClient
