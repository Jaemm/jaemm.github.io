import type { ImgHTMLAttributes } from "react";

const Aws = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    {...props}
    src="https://aws.amazon.com/favicon.ico"
    alt="AWS"
    loading="lazy"
    decoding="async"
  />
);

export { Aws };
