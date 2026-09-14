import "../src/styles/index.css"
import BackToTop from "@components/elements/back-to-top"
import {Icon} from "next/dist/lib/metadata/types/metadata-types"
import {roboto, sourceSans3} from "../src/styles/fonts"
import UserAnalytics from "@components/elements/user-analytics"
import localFont from "next/font/local"
import {ToastMessage} from "@components/elements/toast-message"
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
 * The header and footer arrive as parallel route slots rather than as components rendered here:
 * they need the current node's `sumMinimalHeadFoot` flag, which this layout can't read because it
 * has no dynamic segment. See `app/@header` and `app/@footer`.
 */
const RootLayout = ({
  children,
  modal,
  header,
  footer,
}: {
  children: ReactNode
  modal: ReactNode
  header: ReactNode
  footer: ReactNode
}) => {
  return (
    <html lang="en" className={cn(sourceSans3.className, roboto.variable, stanford.variable)}>
      <body className="text-archway-dark">
        {process.env.VERCEL_ENV === "production" && <UserAnalytics />}
        <nav aria-label="Skip Links">
          <a href="#main-content" className="skiplink">
            Skip to main content
          </a>
        </nav>

        <div className="flex min-h-dvh flex-col">
          {header}
          <main id="main-content" className="flex-grow">
            {children}

            <ToastMessage />
            <BackToTop />
          </main>
          {footer}
        </div>
        <div>{modal}</div>
      </body>
    </html>
  )
}
export default RootLayout
