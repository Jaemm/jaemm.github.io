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
    "분석 결과 원본 JSON과 이미지 파일을 S3에 저장하고 app/web이 같은 원본을 바라보도록 만든 NestJS 기반 analysis API 상세페이지입니다.",
};

const introContent = `
# Analysis Collector API Server

NestJS 기반 모듈형 모놀리식 API로, analysis 도메인을 중심에 두고 auth, database, s3, health, timestamp가 주변을 감싸는 구조입니다.

전역 ValidationPipe, 응답/요청 추적 인터셉터, 예외 필터, Swagger, URI versioning, API prefix를 함께 구성해 운영형 백엔드로 설계했습니다.
기존에는 이미지 분석 알고리즘 결과가 분석 서버를 거치며 후가공되어 app과 web에 노출되는 값이 달라질 수 있었고, 이를 원본 JSON과 이미지 파일을 S3에 직접 저장하는 방식으로 바꿔 채널별 편차를 줄였습니다.

## 1. 프로젝트 소개

- NestJS 기반의 analysis 중심 백엔드입니다.
- 배치 생성, 업로드 URL 발급, confirm, comment, soft delete, 조회까지 analysis 도메인의 전체 흐름을 담당합니다.
- 분석 결과의 JSON 원본과 이미지 파일을 S3에 직접 저장하고, app과 web이 같은 원본 데이터를 기반으로 표시하도록 구조를 바꿨습니다.
- 인증, 데이터 계층, 스토리지, 헬스 체크, timestamp가 핵심 도메인을 감싸는 모듈형 모놀리식 구조입니다.
`;

const content = `

## 2. 담당 역할

- analysis 도메인 중심의 모듈 구조 설계
- 전역 ValidationPipe, ResponseInterceptor, RequestIdInterceptor, ContextInterceptor, AccessLogInterceptor, HttpExceptionFilter 구성
- JWT 기반 인증/인가와 AdminGuard, Public route 예외 설계
- PostgreSQL pg Pool 래퍼와 마이그레이션 bootstrap 구조 정리
- S3 presigned URL, CDN URL, 조회/삭제 흐름 구현

## 3. 기술 스택

- Backend: NestJS, TypeScript
- Auth: JWT, Guard 기반 인가
- DB: PostgreSQL, pg Pool, SQL migration
- Storage: AWS S3
- Observability: requestId, AsyncLocalStorage, access log, response envelope, error log
- Docs: Swagger
- Validation: ValidationPipe

## 4. 기술적 의사결정

- 모듈형 모놀리식 구조 채택
  - analysis를 중심 도메인으로 두고 auth, database, s3, health, timestamp를 분리해 응집도와 유지보수성을 확보했습니다.

- 전역 인터셉터/필터 적용
  - 응답 형식, 요청 추적, 컨텍스트, 접근 로그, 예외 처리를 전역에서 통일해 운영 안정성을 높였습니다.

- ORM 대신 pg Pool 래퍼 사용
  - 마이그레이션과 bootstrap을 애플리케이션 시작 시점에 제어해 스키마 초기화와 적용 흐름을 명시적으로 관리했습니다.

- S3와 DB의 역할 분리
  - 실제 파일은 S3에 저장하고, DB에는 batch와 file key, 상태를 유지해 업로드/다운로드 책임을 나눴습니다.

- 원본 데이터 우선 구조
  - 분석 결과 JSON과 이미지 파일을 S3에 직접 저장해 app과 web이 동일한 원본을 보도록 만들고, 채널별 후가공 편차를 줄였습니다.

- 공개/내부/관리자 API 분리
  - 웹 공개 결과, 내부 webhook 조회, 관리자 hard delete를 서로 다른 컨트롤러와 guard로 분리했습니다.

## 5. 주요 트러블 슈팅

1. **도메인이 커지면서 라우트와 책임이 섞일 위험이 있었음**
   - 문제: analysis, download, web, internal, admin 기능이 한 덩어리로 커지면 흐름이 흐려집니다.
   - 해결: controller와 service를 역할별로 분리하고, 서비스는 오케스트레이션만 담당하게 했습니다.

2. **분석 결과가 분석 서버를 거치며 채널별로 달라질 위험이 있었음**
   - 문제: 기존에는 이미지 분석 알고리즘 결과가 후가공되면서 app과 web에 노출되는 값이 달라질 수 있었습니다.
   - 해결: 결과 JSON 원본과 이미지 파일을 S3에 직접 저장하고, app과 web이 같은 원본 데이터를 기준으로 각자 표시하도록 바꿨습니다.

3. **전역 예외와 응답 포맷이 흔들리면 클라이언트 처리가 복잡해짐**
   - 문제: 라우트별로 응답 구조가 달라지면 프론트와 연동 비용이 커집니다.
   - 해결: ResponseInterceptor와 HttpExceptionFilter로 success, requestId, data 형태를 표준화했습니다.

4. **배치 업로드와 외부 연동은 실패 원인 추적이 어려움**
   - 문제: 파일 업로드, webhook, 조회가 분리되면 어느 지점에서 깨졌는지 찾기 어렵습니다.
   - 해결: requestId, AsyncLocalStorage context, access log, error log를 함께 묶어 추적성을 확보했습니다.

## 6. 배운 점

- 기능을 더하는 것보다 데이터가 어디서 생성되고 어디서 소비되는지를 먼저 고정해야 전체 구조가 흔들리지 않는다는 점을 배웠습니다.
- API 설계에서 정답은 하나의 최종값이 아니라, app과 web 같은 여러 소비자가 같은 원본을 다르게 해석할 수 있게 만드는 것이 더 중요하다는 점을 체감했습니다.
- 운영 기능은 부가 기능이 아니라 제품의 신뢰도를 만드는 본체에 가깝고, requestId와 응답 표준화는 그 신뢰도를 유지하는 최소 장치라는 점을 확인했습니다.

## 7. 아쉬운 점

- 초반에는 도메인 경계보다 기능 완성 속도에 더 집중해서, 공통 규칙을 먼저 고정하는 데 시간이 덜 들어간 점이 아쉽습니다.
- 결과 데이터와 외부 연동이 얽힌 구조는 한 번 꼬이면 재현이 어려워서, 실패 케이스를 더 적극적으로 시뮬레이션하는 테스트 레이어를 먼저 두지 못한 점이 남습니다.
- 다음에는 app/web 소비자별 렌더링 차이까지 포함해 계약 테스트 수준으로 검증하면 구조의 의도를 더 오래 유지할 수 있다고 봅니다.
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
            홈으로
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
              alt="Analysis Collector 시스템 아키텍처"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain p-2"
              loading="lazy"
            />
          </figure>
        </section>

        <Markdown components={markdownComponents}>{content}</Markdown>
      </article>
    </main>
  );
}
