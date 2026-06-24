import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MermaidDiagram } from "@/components/mdx/mermaid-diagram";

export const metadata: Metadata = {
  title: "Analysis Collector API Server",
  description:
    "분석 결과 원본 JSON과 이미지 파일을 S3에 직접 저장하고, app/web이 같은 원본을 바라보도록 재구성한 NestJS 기반 analysis 프로젝트입니다.",
};

const introContent = `
# Analysis Collector API Server

NestJS 기반 모듈형 모놀리식 API로, analysis 도메인을 중심에 두고 auth, database, s3, health, timestamp가 주변에서 받쳐주는 구조입니다.

기존에는 이미지 분석 결과가 분석 서버를 거치며 후가공되었고, 그 과정에서 app과 web에 노출되는 결과가 달라지는 문제가 있었습니다. 이를 해결하기 위해 분석 결과의 원본 JSON과 이미지 파일을 S3에 직접 저장하고, app/web이 동일한 원본 데이터를 기준으로 각자 표시하도록 구조를 바꿨습니다.

## 1. 프로젝트 소개

- analysis 도메인을 중심으로 한 NestJS 기반 백엔드입니다.
- auth, database, s3, health, timestamp 모듈이 주변 기능을 담당합니다.
- 분석 결과 원본 JSON과 이미지 파일을 S3에 직접 저장해, 채널별 결과 편차를 줄였습니다.
- 300만 건 이상의 분석 데이터를 다루는 프로젝트였습니다.
`;

const content = `

## 2. 담당 역할

- analysis 도메인의 API 구조 설계와 모듈 분리
- 배치 생성, 업로드 URL 발급, confirm, comment, soft delete, 조회 흐름 구현
- app/web 결과가 동일한 원본을 바라보도록 S3 저장 및 조회 흐름 재설계
- request-id, context, access log, error log, response envelope를 포함한 운영 공통 기능 정리
- webhook, 내부 조회, 관리자 삭제 등 권한이 다른 엔드포인트 분리

## 3. 기술 스택

- Backend: NestJS, TypeScript
- DB: PostgreSQL, pg Pool, SQL migration
- Auth: JWT, Guard, AdminGuard, Public route
- Storage: AWS S3
- Observability: requestId, AsyncLocalStorage, access log, response envelope, error log
- Docs: Swagger
- Validation: ValidationPipe

## 4. 기술적 의사결정

- 모듈형 구조로 분석 도메인을 분리
  - analysis를 중심 도메인으로 두고 auth, database, s3, health, timestamp를 분리해 응집도는 높이고 변경 범위는 줄였습니다.

- 원본 데이터 중심 구조로 전환
  - 분석 결과를 서버에서 재가공하지 않고, 원본 JSON과 이미지 파일을 S3에 저장해 app/web이 같은 기준 데이터를 보도록 바꿨습니다.

- 직접 관리하는 DB 래퍼 채택
  - ORM 추상화 대신 pg Pool 기반 래퍼를 두고, 부트스트랩 시 스키마 생성과 마이그레이션을 직접 제어했습니다.

- 역할별 엔드포인트 분리
  - 외부 공개용, 내부 webhook 조회용, 관리자용을 분리해 보안과 책임 범위를 명확히 했습니다.

- 운영 관측성 강화
  - request-id와 AsyncLocalStorage로 요청 문맥을 유지하고, access log와 error log를 통합해 장애 분석이 가능하도록 만들었습니다.

## 5. 주요 트러블슈팅

1. **앱과 웹의 결과가 서로 달라지는 문제**
   - 문제: 분석 결과가 서버에서 후가공되면서 app과 web이 서로 다른 최종 값을 보여줄 수 있었습니다.
   - 해결: 원본 JSON과 이미지 파일을 S3에 직접 저장하고, app/web이 동일한 원본을 기준으로 렌더링하도록 바꿨습니다.

2. **분석 도메인과 주변 기능이 뒤섞이는 문제**
   - 문제: 배치 생성, 업로드, 조회, webhook, 관리자 기능이 한 덩어리로 섞이면 유지보수가 어려워집니다.
   - 해결: analysis 중심으로 controller와 service를 분리하고, internal/admin/web 같은 흐름별 경계를 나눴습니다.

3. **DB 스키마 관리와 배포 시점 통제가 필요한 문제**
   - 문제: 분석 API는 스키마 변경이 곧 서비스 안정성과 연결됩니다.
   - 해결: bootstrap 단계에서 존재하지 않으면 DB를 만들고, migration과 warm-up을 함께 수행하도록 했습니다.

4. **운영 중 어디서 깨졌는지 추적하기 어려운 문제**
   - 문제: 요청 단위 문맥이 없으면 분석 실패 원인을 찾기 어렵습니다.
   - 해결: request-id, context, access log, error log, response envelope를 전역으로 통일했습니다.

## 6. 배운 점

- 분석 시스템은 기능 구현보다 데이터의 일관성과 조회 기준을 맞추는 일이 더 중요할 수 있다는 점을 배웠습니다.
- API를 단순히 만드는 것보다, 같은 결과를 app과 web에 안정적으로 보여주는 구조 설계가 더 큰 가치가 있다는 점을 체감했습니다.

## 7. 아쉬운 점

- 초기에는 후가공 단계가 남아 있어 결과 기준이 완전히 하나로 모이지 않았습니다.
- 비동기 처리와 외부 의존성이 많아, 재현 가능한 테스트와 장애 시나리오를 더 촘촘하게 만들 필요가 있었습니다.
`;

export default function ProjectDetailPage() {
  const markdownComponents = {
    pre({
      children,
    }: {
      children?: ReactNode;
    }) {
      const child = children as ReactNode & {
        props?: {
          className?: string;
          children?: ReactNode;
        };
      };

      const className = child?.props?.className || "";
      const languageMatch = /language-(\w+)/.exec(className);
      const language = languageMatch?.[1];
      const code = String(child?.props?.children ?? "").replace(/\n$/, "");

      if (language === "mermaid") {
        return <MermaidDiagram code={code} />;
      }

      return (
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4">
          {children}
        </pre>
      );
    },
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            뒤로
          </Link>
        </Button>

        <Button asChild variant="ghost" size="sm">
          <Link href="#content">
            본문 이동
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      <article
        id="content"
        className="prose max-w-none rounded-2xl border border-border/70 bg-card/70 p-6 md:p-8 prose-headings:scroll-mt-24 dark:prose-invert"
      >
        <Markdown components={markdownComponents}>{introContent}</Markdown>

        <section className="not-prose my-8 space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">시스템 아키텍처</h2>
          <figure className="relative h-[320px] overflow-hidden rounded-2xl border border-border/70 bg-muted/30 md:h-[460px]">
            <Image
              src="/projects/crm/analysiscollector.png"
              alt="시스템 아키텍처"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain p-2"
            />
          </figure>
        </section>

        <Markdown components={markdownComponents}>{content}</Markdown>
      </article>
    </main>
  );
}
