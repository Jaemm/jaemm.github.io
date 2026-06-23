import type { ImgHTMLAttributes } from "react";

const Aws = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  // External favicon; keep a plain image element and silence the Next.js lint rule.
  // eslint-disable-next-line @next/next/no-img-element
  <img
    {...props}
    src="https://aws.amazon.com/favicon.ico"
    alt="AWS"
    loading="lazy"
    decoding="async"
  />
);

export { Aws };
