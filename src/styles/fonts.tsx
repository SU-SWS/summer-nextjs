import {Roboto, Source_Sans_3} from "next/font/google"

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
})
