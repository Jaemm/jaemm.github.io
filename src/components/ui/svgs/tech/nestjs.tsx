import type { ImgHTMLAttributes } from "react";

const Nestjs = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    {...props}
    src="https://nestjs.com/3d.cfabe065.svg"
    alt="NestJS"
    loading="lazy"
    decoding="async"
  />
);

export { Nestjs };
