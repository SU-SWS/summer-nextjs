import Link from "@components/elements/link"
import LockupLogo from "@components/elements/lockup/lockup-logo"
import {FooterLockupProps} from "@components/config-pages/local-footer"

const LockupO = ({line4, siteName, logoUrl}: FooterLockupProps) => {
  return (
    <div className="py-25">
      <Link href="/" className="text-black no-underline">
        <LockupLogo logoUrl={logoUrl} siteName={siteName} />
        <div className="mt-2.5 type-2 font-semibold uppercase">{line4}</div>
      </Link>
    </div>
  )
}
export default LockupO
