import type { ImgHTMLAttributes } from "react";

const Nestjs = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  // External logo asset; keep a plain image element and silence the Next.js lint rule.
  // eslint-disable-next-line @next/next/no-img-element
  <img
    {...props}
    src="https://nestjs.com/3d.cfabe065.svg"
    alt="NestJS"
    loading="lazy"
    decoding="async"
  />
);

export { Nestjs };
