import classNames from "classnames";

export default function ExternalLinkButton(text: string, href: string) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={href}
      className={classNames(
        "font-semibold bg-bg-darkRaised px-10 py-4 rounded-xl border border-separator-dark text-xl",
        "hover:bg-gradient-to-br hover:from-techyGradientA hover:to-techyGradientB hover:decoration-techyGradientB"
      )}
    >
      {text}
    </a>
  );
}
