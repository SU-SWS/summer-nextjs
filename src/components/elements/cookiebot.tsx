"use client"

import ReactCookieBot from "react-cookiebot"
import {useEventListener} from "usehooks-ts"

const Cookiebot = () => {
  const cookieBotConsent = () => {
    const consent = window.Cookiebot?.consent?.statistics ? "granted" : "denied"
    if (typeof window.clarity !== "undefined") {
      window.clarity("consentv2", {ad_Storage: consent, analytics_Storage: consent})
    }
  }

  // Cookiebot event listeners. See https://www.cookiebot.com/en/developer/#h-event-handling
  // @ts-expect-error Cookiebot window event is custom.
  useEventListener("CookiebotOnAccept", cookieBotConsent)
  // @ts-expect-error Cookiebot window event is custom.
  useEventListener("CookiebotOnDecline", cookieBotConsent)
  return <ReactCookieBot domainGroupId="bcda1e2f-63c7-4cad-81b4-04a49e30b05f" />
}

export default Cookiebot
