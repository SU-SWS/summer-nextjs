import Link from "@components/elements/link"
import LockupLogo from "@components/elements/lockup/lockup-logo"
import {FooterLockupProps} from "@components/config-pages/local-footer"

const LockupA = ({line1, line5, siteName, logoUrl}: FooterLockupProps) => {
  return (
    <div className="w-fit py-10">
      <Link href="/" className="text-black no-underline">
        <div className="flex flex-col text-black lg:flex-row lg:items-end">
          <div className="border-black py-2 pr-4 lg:border-r">
            <LockupLogo logoUrl={logoUrl} siteName={siteName} />
          </div>
          <div className="font-roboto text-28 font-light text-black lg:pl-4">{line1 || siteName}</div>
        </div>

        {line5 && (
          <div className="border-t border-black font-roboto font-semibold uppercase lg:border-t-0">{line5}</div>
        )}
      </Link>
    </div>
  )
}
export default LockupA
