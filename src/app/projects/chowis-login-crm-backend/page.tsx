import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MermaidDiagram } from "@/components/mdx/mermaid-diagram";

export const metadata: Metadata = {
  title: "Login CRM API Server",
  description:
    "NestJS 기반 CRM 백엔드 프로젝트의 소개, 역할, 기술 스택, 아키텍처와 트러블슈팅을 정리한 상세페이지입니다.",
};

const introContent = `
# Login CRM API Server

NestJS 기반 CRM 백엔드 서비스로, 고객, 상담사, 매장, 제품, 라이선스, 분석 이벤트, 웹 결과 관리, 인증/권한, 이메일 발송까지 포함한 통합 운영용 서버입니다.

PostgreSQL, Redis(BullMQ), JWT, Swagger, Prometheus, S3, 외부 메일/인증 연동을 포함한 모듈형 모놀리식 구조로 구성했습니다.

## 1. 프로젝트 소개

- NestJS 기반의 CRM 백엔드 서비스입니다.
- 고객, 상담사, 매장, 제품, 라이선스, 분석 이벤트, 웹 결과 관리, 인증/권한, 이메일 발송까지 포함한 통합 운영용 서버입니다.
- PostgreSQL, Redis(BullMQ), JWT, Swagger, Prometheus, S3, 외부 메일/인증 연동을 포함한 모듈형 모놀리식 구조로 구성되어 있습니다.
`;

const content = `

## 2. 담당 역할

- 백엔드 아키텍처 설계 및 NestJS 모듈 구조 정리
- 인증/인가 흐름 설계, JWT 기반 로그인 및 권한 제어 구현
- 다중 DB 연결 및 분석용 DB 분리 구조 구성
- 공통 예외 처리, 로깅, 요청 추적 ID, 메트릭 수집 등 운영 공통 기능 설계
- 메일 큐, 파일 업로드, 외부 API 연동, 분석 이벤트 처리 구조 구현

## 3. 기술 스택

- Backend: NestJS, TypeScript
- DB: PostgreSQL, TypeORM
- Auth: JWT, Passport
- Queue: Redis, BullMQ
- Observability: Winston, Prometheus, Airbrake
- Docs: Swagger
- Infra/Util: Helmet, CORS, cookie-parser, nodemailer, S3, Azure/Microsoft OAuth, Google 관련 연동, Juso API
- Validation: class-validator, ValidationPipe

## 4. 기술적 의사결정

- 모듈형 모놀리식 구조 채택
  - 도메인별 기능을 customers, consultants, products, analysisEvents처럼 NestJS 모듈로 분리해 유지보수성과 확장성을 확보했습니다.

- 다중 PostgreSQL 커넥션 구성
  - 운영 데이터와 분석용 DB를 분리해 조회 부하와 책임을 나눴습니다.

- 비동기 메일 처리
  - 메일 발송은 BullMQ 큐로 분리해 요청 API와 발송 처리의 결합도를 낮추고 안정성을 높였습니다.

- 전역 예외 처리 + 다국어 메시지
  - 모든 예외를 공통 필터에서 처리해 응답 형식을 통일하고, 언어별 메시지 처리를 지원했습니다.

- 운영 관측성 강화
  - request-id, 구조화 로그, Prometheus, Airbrake를 연결해 장애 분석과 추적성을 확보했습니다.

## 5. 주요 트러블 슈팅

1. **다중 DB 환경에서 엔티티 관리가 복잡해짐**
   - 문제: 분석 DB와 일반 업무 DB가 섞이면 엔티티 충돌과 쿼리 대상 혼선이 발생할 수 있었습니다.
   - 해결: TypeORM 커넥션을 globalDB, cndpSkinDB, cndpHairDB, cmaSkinDB, cmaHairDB로 분리하고, 분석 전용 엔티티 범위를 따로 관리했습니다.

2. **에러 응답 형식이 기능마다 달라 클라이언트 처리가 어려움**
   - 문제: 각 모듈에서 다른 예외 포맷을 쓰면 프론트/연동 측 처리 비용이 커집니다.
   - 해결: AllExceptionsFilter로 모든 예외를 공통 응답 포맷으로 변환하고, 언어별 에러 메시지도 일관되게 처리했습니다.

3. **메일 발송이 동기식이면 API 지연과 실패 전파가 발생**
   - 문제: 발송 지연이 곧 API 응답 지연으로 이어질 수 있습니다.
   - 해결: BullMQ 큐를 도입하고 워커에서 순차 처리하도록 분리해 API와 발송 책임을 나눴습니다.

## 6. 배운 점

- 모듈 단위로 책임을 분리하면 기능이 많아져도 구조를 유지하기 쉽고, 변경 영향 범위를 줄일 수 있다는 점을 배웠습니다.
- 단순히 기능을 만드는 것보다 예외 처리, 로깅, 메트릭, 큐 처리처럼 운영 관점의 설계를 함께 해야 서비스 품질이 올라간다는 점을 체감했습니다.

## 7. 아쉬운 점

- 초기에는 도메인별 공통 규칙이 충분히 표준화되지 않아, 일부 모듈에서 코드 스타일과 처리 방식이 다르게 흩어질 여지가 있었습니다.
- 분석 이벤트, 메일, 외부 연동처럼 비동기/외부 의존성이 많은 영역은 테스트와 장애 재현이 더 어려워서, 더 촘촘한 자동화 검증이 필요하다고 느꼈습니다.
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
          <h2 className="text-lg font-semibold tracking-tight">서비스 아키텍처</h2>
          <figure className="h-[320px] overflow-hidden rounded-2xl border border-border/70 bg-muted/30 md:h-[420px]">
            <img
              src="/projects/crm/service.png"
              alt="CRM 서비스 화면"
              className="h-full w-full object-contain p-2"
              loading="lazy"
            />
          </figure>
        </section>

        <Markdown components={markdownComponents}>{content}</Markdown>
      </article>
    </main>
  );
}
