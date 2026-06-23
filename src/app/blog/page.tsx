import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "블로그",
  description: "개발 경험과 기록을 정리하는 블로그입니다.",
  openGraph: {
    title: "블로그",
    description: "개발 경험과 기록을 정리하는 블로그입니다.",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "블로그",
    description: "개발 경험과 기록을 정리하는 블로그입니다.",
    images: ["/og-image.svg"],
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">블로그</h1>
        <p className="text-sm text-muted-foreground mb-8">
          개발 경험과 기록을 정리하는 글을 모아둡니다.
        </p>
      </BlurFade>

      {sortedPosts.length > 0 ? (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col gap-5">
            {sortedPosts.map((post, id) => {
              const slug = post._meta.path.replace(/\.mdx$/, "");
              const indexNumber = id + 1;
              return (
                <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={slug}>
                  <Link
                    className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    href={`/blog/${slug}`}
                  >
                    <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
                      {String(indexNumber).padStart(2, "0")}.
                    </span>
                    <div className="flex flex-col gap-y-2 flex-1">
                      <p className="tracking-tight text-lg font-medium">
                        <span className="group-hover:text-foreground transition-colors">
                          {post.title}
                          <ChevronRight
                            className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                            aria-hidden
                          />
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {post.publishedAt}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        </BlurFade>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              아직 작성된 블로그 글이 없습니다. 곧 채워질 예정입니다.
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
