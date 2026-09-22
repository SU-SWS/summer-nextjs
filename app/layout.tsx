import "../src/styles/index.css"
import {Icon} from "next/dist/lib/metadata/types/metadata-types"
import {roboto, sourceSans3} from "../src/styles/fonts"
import UserAnalytics from "@components/elements/user-analytics"
import localFont from "next/font/local"
import cn from "@lib/utils/className"
import {ReactNode} from "react"

const appleIcons: Icon[] = [60, 72, 76, 114, 120, 144, 152, 180].map(size => ({
  url: `https://www-media.stanford.edu/assets/favicon/apple-touch-icon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
}))

const icons: Icon[] = [16, 32, 96, 128, 192, 196].map(size => ({
  url:
    size === 128
      ? `https://www-media.stanford.edu/assets/favicon/favicon-${size}.png`
      : `https://www-media.stanford.edu/assets/favicon/favicon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
}))

/**
 * Metadata that does not change often.
 */
export const metadata = {
  metadataBase: new URL("https://summer.stanford.edu"),
  icons: {
    icon: [{url: "/favicon.ico"}, ...icons],
    apple: appleIcons,
  },
}

const stanford = localFont({
  src: "../public/fonts/stanford.woff2",
  weight: "300",
  variable: "--font-stanford",
})

/**
 * The document shell only.
 *
 * The header and footer are rendered by each segment's layout through `SiteChrome`, because the
 * reduced chrome depends on the node behind the current url and this layout has no dynamic
 * segment to read it from.
 */
const RootLayout = ({children, modal}: {children: ReactNode; modal: ReactNode}) => {
  return (
    <html lang="en" className={cn(sourceSans3.className, roboto.variable, stanford.variable)}>
      <body className="text-archway-dark">
        {process.env.VERCEL_ENV === "production" && <UserAnalytics />}
        <nav aria-label="Skip Links">
          <a href="#main-content" className="skiplink">
            Skip to main content
          </a>
        </nav>

        <div className="flex min-h-dvh flex-col">{children}</div>
        <div>{modal}</div>
      </body>
    </html>
  )
}
export default RootLayout
