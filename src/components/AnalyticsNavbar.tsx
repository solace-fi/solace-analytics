/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

function NavbarLink({ href, children }: { href: string; children: string }) {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link href={href}>
      <a
        className={classNames(
          "px-10 py-2.5",
          {
            "bg-blue cursor-default": isActive,
          },
          {
            "hover:bg-bg-darkRaised hover:brightness-110": !isActive,
          }
        )}
      >
        {children}
      </a>
    </Link>
  );
}

const AnalyticsNavbar: any = () => {
  const router = useRouter();
  return (
    <div className="fixed flex flex-col top-0 left-0 gap-5 bg-bg-darkRaised h-screen font-body select-none">
      <Link href="/" passHref>
        <a>
          <img
            src="/svg/solace-logo-rainbow.svg"
            alt="Solace Logo"
            className="mx-5 w-36 my-5"
          />
        </a>
      </Link>
      <NavbarLink href="/">Home</NavbarLink>
      <NavbarLink href="/markets">Markets</NavbarLink>
      <NavbarLink href="/policies">Policies</NavbarLink>
      <NavbarLink href="/exposures">Exposures</NavbarLink>
      <NavbarLink href="/uwp">UWP</NavbarLink>
      <NavbarLink href="/xslocker">xsLocker</NavbarLink>
      <NavbarLink href="/votePower">Vote Power</NavbarLink>
      <NavbarLink href="/community">Community</NavbarLink>
    </div>
  );
};

export default AnalyticsNavbar;
