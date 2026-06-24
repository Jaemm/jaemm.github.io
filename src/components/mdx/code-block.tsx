"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";
import { codeToHtml } from "shiki/bundle/web";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { MermaidDiagram } from "./mermaid-diagram";

type CodeBlockProps = ComponentProps<"pre">;

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-([a-z0-9-]+)/i);
  return match ? match[1] : "plaintext";
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [title, setTitle] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    const codeEl = pre?.querySelector("code");
    if (!pre || !codeEl) return;

    const nextCode = codeEl.textContent || "";
    const nextLanguage = extractLanguage(codeEl.className);
    const nextTitle = codeEl.getAttribute("data-title");

    setCode(nextCode);
    setLanguage(nextLanguage);
    setTitle(nextTitle);

    if (nextLanguage === "mermaid") {
      setHtml("");
      return;
    }

    void codeToHtml(nextCode, {
      lang: nextLanguage as any,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    })
      .then((result) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(result, "text/html");
        setHtml(doc.querySelector("code")?.innerHTML ?? "");
      })
      .catch((error) => {
        console.error("Failed to highlight code:", error);
        setHtml("");
      });
  }, [children]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  if (language === "mermaid") {
    return (
      <div className="group relative rounded-xl overflow-hidden border border-border">
        {title ? (
          <div className="p-3 text-xs font-medium border-b border-border rounded-t-xl bg-muted/50 text-foreground">
            {title}
          </div>
        ) : null}
        <MermaidDiagram code={code} />
      </div>
    );
  }

  return (
    <div className="group relative rounded-xl overflow-hidden border border-border">
      <pre
        ref={preRef}
        {...props}
        className={cn("p-0! m-0! overflow-x-auto", props.className)}
      >
        {title ? (
          <div className="p-3 text-xs font-medium border-b border-border rounded-t-xl bg-muted/50 text-foreground">
            {title}
          </div>
        ) : null}

        <Button
          onClick={handleCopy}
          variant="outline"
          size="icon"
          className={cn(
            "absolute size-8 text-primary cursor-pointer right-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity rounded-md border border-border shadow-none",
            title ? "top-13" : "top-3",
          )}
          aria-label="Copy code"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>

        {html ? (
          <div className="p-3">
            <code
              className={`shiki ${props.className ?? ""}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        ) : (
          <div className="p-4">{children}</div>
        )}
      </pre>
    </div>
  );
}
