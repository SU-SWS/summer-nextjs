import {getMenu} from "@lib/gql/gql-queries"
import SideNav from "@components/menu/side-nav"
import {HtmlHTMLAttributes, ReactNode} from "react"
import {BookLink, MenuAvailable, MenuItem} from "@lib/gql/__generated__/graphql"
import {getMenuActiveTrail} from "@lib/drupal/utils"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Current url path.
   */
  currentPath: string
  menuItems?: MenuItem[] | BookLink[]
  /**
   * Additional content displayed in the sidebar, below the secondary navigation.
   */
  leftSideBar?: ReactNode | ReactNode[]
  /**
   * Hide the secondary navigation menu.
   */
  hideSecondaryNav?: boolean
}

const InteriorPage = ({children, currentPath, menuItems, leftSideBar, hideSecondaryNav, ...props}: Props) => (
  <div {...props} className={cn("centered flex flex-col gap-50 lg:flex-row", props.className)}>
    {/* The menu lookup lives in its own component, so the page content renders alongside it instead of waiting. */}
    <InteriorSideBar hideSecondaryNav={hideSecondaryNav} currentPath={currentPath} menuItems={menuItems}>
      {leftSideBar}
    </InteriorSideBar>

    <div className="min-w-0 grow" id="page-content">
      {children}
    </div>
  </div>
)

const InteriorSideBar = async ({
  children,
  hideSecondaryNav,
  currentPath,
  menuItems,
}: Pick<Props, "children" | "hideSecondaryNav" | "currentPath" | "menuItems">) => {
  const menu = menuItems || (await getMenu(MenuAvailable.Main))
  const activeTrail: string[] = getMenuActiveTrail(menu, currentPath)

  // Peel off the menu items from the parent.
  const topMenuItem = activeTrail.length > 0 ? menu.find(item => item.id === activeTrail[0]) : undefined
  const subTree = topMenuItem ? topMenuItem.children : []
  const showSideNav = !hideSecondaryNav && (subTree.length > 1 || !!subTree[0]?.children)

  if (!showSideNav && !children) return null

  return (
    <aside className={cn("shrink-0 lg:w-1/4", {"tw-hidden lg:block": !children})}>
      {showSideNav && (
        <div className="tw-hidden lg:block">
          <a href="#page-content" className="skiplink">
            Skip secondary navigation
          </a>
          <SideNav menuItems={subTree} activeTrail={activeTrail} />
        </div>
      )}
      {children}
    </aside>
  )
}

export default InteriorPage
