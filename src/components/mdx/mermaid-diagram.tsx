"use client";

import mermaid from "mermaid";
import { useEffect, useId, useRef, useState } from "react";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  fontFamily: "inherit",
  themeVariables: {
    background: "transparent",
    primaryColor: "#f5f5f4",
    primaryTextColor: "#111827",
    primaryBorderColor: "#d6d3d1",
    lineColor: "#78716c",
    secondaryColor: "#fafaf9",
    tertiaryColor: "#f3f4f6",
  },
});

export function MermaidDiagram({ code }: { code: string }) {
  const id = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, code);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Mermaid 다이어그램을 렌더링하지 못했습니다.");
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [code, id]);

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border/70 bg-background/80">
      <div ref={containerRef} className="overflow-x-auto p-4 [&_svg]:mx-auto [&_svg]:max-w-full" />
      {error ? <pre className="p-4 text-sm text-destructive">{error}</pre> : null}
    </div>
  );
}
