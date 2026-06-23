import type { SVGProps } from "react";

const Redis = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 256 256" fill="none" aria-hidden="true">
    <path
      d="M32 84.5L128 36l96 48.5L128 133z"
      fill="#DC382D"
      opacity="0.95"
    />
    <path
      d="M32 84.5L128 133l96-48.5"
      stroke="#A41E11"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <path
      d="M128 133v86l96-48.5V84.5z"
      fill="#BA2D24"
    />
    <path
      d="M32 84.5v86L128 219v-86z"
      fill="#FF6B5F"
    />
    <path
      d="M128 133v86L32 170.5"
      stroke="#C63A2C"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <path
      d="M128 133l96 37.5"
      stroke="#7C130A"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <circle cx="90" cy="103" r="11" fill="#fff" opacity="0.95" />
    <circle cx="128" cy="86" r="11" fill="#fff" opacity="0.95" />
    <circle cx="166" cy="103" r="11" fill="#fff" opacity="0.95" />
    <circle cx="90" cy="143" r="11" fill="#fff" opacity="0.95" />
    <circle cx="128" cy="126" r="11" fill="#fff" opacity="0.95" />
    <circle cx="166" cy="143" r="11" fill="#fff" opacity="0.95" />
  </svg>
);

export { Redis };
