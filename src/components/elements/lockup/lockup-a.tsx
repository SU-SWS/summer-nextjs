import Link from "@components/elements/link"
import LockupLogo from "@components/elements/lockup/lockup-logo"
import {FooterLockupProps} from "@components/config-pages/local-footer"

const LockupA = ({line1, line5, siteName, logoUrl}: FooterLockupProps) => {
  return (
    <div className="py-10">
      <Link href="/" className="text-black no-underline">
        <div className="flex flex-row items-end no-underline">
          <div className="border-r-2 border-black py-2 pr-4">
            <LockupLogo logoUrl={logoUrl} siteName={siteName} />
          </div>
          <div className="type-2 pl-4 font-normal text-black">{line1 || siteName}</div>
        </div>

        {line5 && <div className="border-t border-black font-semibold uppercase lg:border-t-0">{line5}</div>}
      </Link>
    </div>
  )
}
export default LockupA
