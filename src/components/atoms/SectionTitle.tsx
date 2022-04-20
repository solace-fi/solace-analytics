import classNames from "classnames";

export default function SectionTitle({
  children,
  size,
}: {
  children: React.ReactNode;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  const classes = classNames(
    "font-title font-bold max-w-4xl leading-[80px] mb-5",
    { "text-7xl": size === "h1" },
    { "text-6xl": size === "h2" },
    { "text-5xl": size === "h3" },
    { "text-4xl": size === "h4" },
    { "text-3xl": size === "h5" },
    { "text-2xl": size === "h6" }
  );
  return (
    <>
      {
        {
          h1: <h1 className={classes}>{children}</h1>,
          h2: <h2 className={classes}>{children}</h2>,
          h3: <h3 className={classes}>{children}</h3>,
          h4: <h4 className={classes}>{children}</h4>,
          h5: <h5 className={classes}>{children}</h5>,
          h6: <h6 className={classes}>{children}</h6>,
        }[size ?? "h1"]
      }
    </>
  );
}
