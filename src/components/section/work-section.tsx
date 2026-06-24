/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { DATA } from "@/data/resume";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection() {
  const sortedWork = [...DATA.work].sort((a, b) => {
    const aYear = Number.parseInt(a.start, 10);
    const bYear = Number.parseInt(b.start, 10);

    if (Number.isNaN(aYear) || Number.isNaN(bYear)) {
      return 0;
    }

    return bYear - aYear;
  });

  return (
    <div className="w-full grid gap-6">
      {sortedWork.map((work) => (
        <div key={work.company} className="w-full grid gap-2">
          <div className="flex items-center gap-x-3 justify-between w-full text-left">
            <div className="flex items-center gap-x-3 flex-1 min-w-0">
              <LogoImage src={work.logoUrl} alt={work.company} />
              <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                <div className="font-semibold leading-none flex items-center gap-2">
                  {work.company}
                </div>
                <div className="font-sans text-sm text-muted-foreground">
                  {work.title}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
              <span>
                {work.start} - {work.end ?? "?꾩옱"}
              </span>
            </div>
          </div>
          <div className="ml-13 text-xs sm:text-sm text-muted-foreground prose max-w-none dark:prose-invert">
            <Markdown>{work.description}</Markdown>
          </div>
        </div>
      ))}
    </div>
  );
}
