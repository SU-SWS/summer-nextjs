import Address from "@components/elements/address"
import Link from "@components/elements/link"
import Wysiwyg from "@components/elements/wysiwyg"
import LockupLogo from "@components/elements/lockup/lockup-logo"
import LockupA from "@components/elements/lockup/lockup-a"
import LockupB from "@components/elements/lockup/lockup-b"
import LockupD from "@components/elements/lockup/lockup-d"
import LockupE from "@components/elements/lockup/lockup-e"
import LockupH from "@components/elements/lockup/lockup-h"
import LockupI from "@components/elements/lockup/lockup-i"
import LockupM from "@components/elements/lockup/lockup-m"
import LockupO from "@components/elements/lockup/lockup-o"
import LockupP from "@components/elements/lockup/lockup-p"
import LockupR from "@components/elements/lockup/lockup-r"
import LockupS from "@components/elements/lockup/lockup-s"
import LockupT from "@components/elements/lockup/lockup-t"
import {JSX} from "react"
import {H2} from "@components/elements/headers"
import TwitterIcon from "@components/elements/icons/TwitterIcon"
import YoutubeIcon from "@components/elements/icons/YoutubeIcon"
import FacebookIcon from "@components/elements/icons/FacebookIcon"
import {Maybe, StanfordBasicSiteSetting, StanfordLocalFooter} from "@lib/gql/__generated__/drupal.d"
import {buildUrl} from "@lib/drupal/utils"
import InstagramIcon from "@components/elements/icons/InstagramIcon"
import LinkedInIcon from "@components/elements/icons/LinkedInIcon"
import {getConfigPage, getConfigPageField} from "@lib/gql/gql-queries"

const LocalFooter = async () => {
  const siteName = await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suSiteName"]>(
    "StanfordBasicSiteSetting",
    "suSiteName"
  )
  const localFooterConfig = await getConfigPage<StanfordLocalFooter>("StanfordLocalFooter")
  if (!localFooterConfig?.suFooterEnabled) return

  const lockupProps = {
    siteName,
    useDefault: localFooterConfig.suLocalFootUseLoc,
    lockupOption: localFooterConfig.suLocalFootLocOp,
    line1: localFooterConfig.suLocalFootLine1,
    line2: localFooterConfig.suLocalFootLine2,
    line3: localFooterConfig.suLocalFootLine3,
    line4: localFooterConfig.suLocalFootLine4,
    line5: localFooterConfig.suLocalFootLine5,
    logoUrl:
      !localFooterConfig.suLocalFootUseLogo && localFooterConfig.suLocalFootLocImg?.url
        ? buildUrl(localFooterConfig.suLocalFootLocImg?.url).toString()
        : undefined,
  }

  return (
    <div className="local-footer bg-foggy-light py-20">
      <div className="centered">
        <div className="md:rs-mb-4">
          <FooterLockup {...lockupProps} />
        </div>
        <div className="flex flex-col gap-32 lg:flex-row lg:gap-0 [&_a:focus]:underline [&_a:hover]:underline [&_a]:font-semibold [&_a]:no-underline [&_a]:transition">
          <div className="mr-auto lg:w-1/4">
            {localFooterConfig.suLocalFootAddress && <Address {...localFooterConfig.suLocalFootAddress} />}

            {localFooterConfig.suLocalFootAction && (
              <ul className="list-unstyled">
                {localFooterConfig.suLocalFootAction.map((link, index) => {
                  if (!link.url) return
                  return (
                    <li key={`footer-action-link-${index}`}>
                      <Link href={link.url}>{link.title}</Link>
                    </li>
                  )
                })}
              </ul>
            )}

            <Wysiwyg html={localFooterConfig.suLocalFootPrCo?.processed} className="text-archway" />

            {localFooterConfig.suLocalFootSocial && (
              <ul className="list-unstyled rs-mt-4 flex items-center gap-11 children:mb-0">
                {localFooterConfig.suLocalFootSocial.map((link, index) => {
                  if (!link.url) return
                  return (
                    <li key={`footer-action-link-${index}`}>
                      <Link href={link.url} className="text-archway">
                        <SocialIcon url={link.url} />
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="font-roboto lg:w-1/4">
            {localFooterConfig.suLocalFootPrimeH && (
              <H2 className="type-2 font-normal">{localFooterConfig.suLocalFootPrimeH}</H2>
            )}
            {localFooterConfig.suLocalFootPrimary && (
              <ul className="list-unstyled">
                {localFooterConfig.suLocalFootPrimary.map((link, index) => {
                  if (!link.url) return
                  return (
                    <li key={`footer-primary-link-${index}`}>
                      <Link href={link.url} className="link--action">
                        {link.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
            <Wysiwyg html={localFooterConfig.suLocalFootSeCo?.processed} />
          </div>

          <div className="font-roboto lg:w-1/4">
            {localFooterConfig.suLocalFootSecondH && (
              <H2 className="type-2 font-normal">{localFooterConfig.suLocalFootSecondH}</H2>
            )}

            {localFooterConfig.suLocalFootSecond && (
              <ul className="list-unstyled flex-1">
                {localFooterConfig.suLocalFootSecond.map((link, index) => {
                  if (!link.url) return
                  return (
                    <li key={`footer-second-link-${index}`}>
                      <Link href={link.url} className="link--action">
                        {link.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}

            <Wysiwyg html={localFooterConfig.suLocalFootTr2Co?.processed} />
          </div>

          <Wysiwyg html={localFooterConfig.suLocalFootTrCo?.processed} className="font-roboto lg:w-1/4" />
        </div>
      </div>
    </div>
  )
}

const SocialIcon = ({url}: {url: string}) => {
  if (url.includes("facebook")) return <FacebookIcon />
  if (url.includes("linkedin")) return <LinkedInIcon />
  if (url.includes("twitter.com")) return <TwitterIcon />
  if (url.includes("instagram.com")) return <InstagramIcon />
  if (url.includes("youtube.com")) return <YoutubeIcon />
  return null
}

export interface FooterLockupProps {
  useDefault?: Maybe<boolean>
  siteName?: Maybe<string>
  lockupOption?: Maybe<string>
  line1?: Maybe<string>
  line2?: Maybe<string>
  line3?: Maybe<string>
  line4?: Maybe<string>
  line5?: Maybe<string>
  logoUrl?: Maybe<string>
}

const FooterLockup = ({useDefault = true, siteName, lockupOption, ...props}: FooterLockupProps): JSX.Element => {
  const lockupProps = {
    ...props,
  }

  lockupOption = useDefault ? "default" : lockupOption

  switch (lockupOption) {
    case "none":
      return (
        <div className="py-10">
          <Link href="/" className="flex flex-row gap-4 font-roboto no-underline">
            <LockupLogo {...lockupProps} />
          </Link>
        </div>
      )

    case "a":
      return <LockupA {...lockupProps} />

    case "b":
      return <LockupB {...lockupProps} />

    case "d":
      return <LockupD {...lockupProps} />

    case "e":
      return <LockupE {...lockupProps} />

    case "h":
      return <LockupH {...lockupProps} />

    case "i":
      return <LockupI {...lockupProps} />

    case "m":
      return <LockupM {...lockupProps} />

    case "o":
      return <LockupO {...lockupProps} />

    case "p":
      return <LockupP {...lockupProps} />

    case "r":
      return <LockupR {...lockupProps} />

    case "s":
      return <LockupS {...lockupProps} />

    case "t":
      return <LockupT {...lockupProps} />
  }

  return (
    <div className="py-10">
      <Link href="/" className="flex flex-col text-black no-underline lg:flex-row lg:items-end">
        <div className="border-black py-2 pr-4 lg:border-r">
          <LockupLogo {...lockupProps} />
        </div>
        <div className="font-roboto text-28 font-light text-black lg:pl-4">{siteName || "University"}</div>
      </Link>
    </div>
  )
}
export default LocalFooter
