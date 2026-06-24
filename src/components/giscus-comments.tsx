"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { MessageSquareMore } from "lucide-react";

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

const discussionsUrl = "https://github.com/Jaemm/jaemm.github.io/discussions/categories/general";

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const isConfigured = Boolean(repo && repoId && category && categoryId);

  useEffect(() => {
    if (!isConfigured || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo as string);
    script.setAttribute("data-repo-id", repoId as string);
    script.setAttribute("data-category", category as string);
    script.setAttribute("data-category-id", categoryId as string);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [isConfigured, theme]);

  if (!isConfigured) {
    return (
      <section className="mt-16 rounded-2xl border border-border/70 bg-muted/20 p-6">
        <div className="flex items-start gap-3">
          <MessageSquareMore className="mt-0.5 size-5 text-muted-foreground" />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">댓글</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              GitHub Discussions 연결 정보가 아직 없어서, 현재는
              Discussions 페이지로 바로 이동할 수 있습니다.
            </p>
            <Link
              href={discussionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Discussions에서 보기
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <div className="mb-4 flex items-center gap-2">
        <MessageSquareMore className="size-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">댓글</h2>
      </div>
      <div
        ref={containerRef}
        className="rounded-2xl border border-border/70 bg-background p-2"
      />
    </section>
  );
}
