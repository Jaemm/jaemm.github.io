import { HomeIcon, NotebookIcon } from "lucide-react";
import { NextjsIconDark } from "@/components/ui/svgs/tech/nextjsIconDark";
import { Nestjs } from "@/components/ui/svgs/tech/nestjs";
import { Postgresql } from "@/components/ui/svgs/tech/postgresql";
import { Redis } from "@/components/ui/svgs/tech/redis";
import { Docker } from "@/components/ui/svgs/tech/docker";
import { Kubernetes } from "@/components/ui/svgs/tech/kubernetes";
import { Aws } from "@/components/ui/svgs/tech/aws";
import { Icons } from "@/components/icons";

export const DATA = {
  name: "최재민",
  initials: "CJ",
  url: "https://jaemm.github.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "백엔드 중심으로 서비스 안정성과 운영성을 함께 설계하는 개발자입니다.",
  summary:
    "  NestJS & TypeScript와 AWS 기반으로 백엔드 서비스와 운영 인프라를 설계해온 개발자입니다. \n\n CRM, 분석 서버, 스마트 배터리 관리 시스템, 피부 진단 플랫폼 등에서 대규모 데이터 처리, 비동기 작업 분리, 데이터 일관성 확보, 성능 최적화를 중심으로 개발해왔습니다. 기능 구현에 그치지 않고 서비스 구조와 운영 안정성까지 함께 고민하는 것을 중요하게 생각합니다.",
  avatarUrl: "/me.jpg",
  skills: [
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Nest.js", icon: Nestjs },
    { name: "Postgres", icon: Postgresql },
    { name: "Redis", icon: Redis },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "AWS", icon: Aws },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "홈" },
    { href: "/blog", icon: NotebookIcon, label: "블로그" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jaemm",
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: "이메일 보내기",
        url: "mailto:noah00955@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "SK네트웍스서비스",
      href: "#",
      badges: [],
      location: "QA",
      title: "SQA",
      logoUrl: "/logos/sk.jpg",
      start: "2019",
      end: "2021",
      description: "",
    },
    {
      company: "퍼스트 씨엔디",
      href: "#",
      badges: [],
      location: "개발",
      title: "풀스택 개발",
      logoUrl: "/logos/firstcnd.avif",
      start: "2022",
      end: "2024",
      description: `- NestJS 기반 스마트 배터리 관리 시스템(BMS) 서버 구축
- 이동식 전원공급 디바이스의 충전/방전량, 온도 등 실시간 상태 수집 API 설계
- NestJS DI 구조를 활용한 IoT 데이터 파이프라인과 백엔드 컴포넌트 구현
- Next.js 및 AWS 기반 통합 관제(O&M) 대시보드와 운영자 어드민 페이지 개발
- 충전 요청, 정산, 구독 로직을 REST API로 표준화해 모바일 앱·디바이스·어드민 간 연동 안정화
- AWS RDS 인덱싱 및 쿼리 최적화로 가동 이력 조회 속도를 3초 -> 0.4초 개선`,
    },
    {
      company: "초이스테크 코리아",
      href: "https://www.choicetech.co.kr",
      badges: [],
      location: "개발",
      title: "백엔드 개발자",
      logoUrl: "/logos/ctk.avif",
      start: "2024",
      end: "현재",
      description:
        "- B2B 멀티테넌시 기반 피부 진단 Core API 구축\n- 올리브영 SKIN SCAN 및 글로벌 브랜드 요구사항 대응\n- AI 요청 파이프라인 최적화로 응답 시간 7초 -> 3초 단축\n- 마이페이지/리포트 조회 속도 3초 -> 0.4초 단축\n- OAuth2, Webhook, 데이터 암호화 기반 보안 아키텍처 설계\n- 전국 매장 키오스크·모바일 앱 연동 및 실시간 동기화 안정화",
    },
  ],
  education: [
    {
      school: "국가평생교육진흥원",
      href: "https://www.nile.or.kr",
      degree: "컴퓨터공학과 (학사)",
      logoUrl: "/logos/academic banck.webp",
      start: "2024",
      end: "2026",
    },
    {
      school: "수원과학대학교",
      href: "https://ssc.ac.kr/intro/univ/sub010101",
      degree: "컴퓨터정보과 (전문학사)",
      logoUrl: "/logos/suwonscience.png",
      start: "2014",
      end: "2019",
    },
  ],
  training: [
    {
      school: "그린컴퓨터아카데미",
      href: "https://greenart.co.kr/green/greenIntroduce",
      degree: "Java 개발자 양성과정",
      logoUrl: "/logos/greenart.svg",
      start: "2021",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "Login CRM API Server",
      href: "/projects/chowis-login-crm-backend/",
      dates: "NestJS 기반 CRM 백엔드",
      active: true,
      description:
        "고객, 상담사, 매장, 제품, 라이선스, 분석 이벤트, 웹 결과, 인증/권한, 메일 발송을 통합한 CRM 백엔드입니다.",
      technologies: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "TypeORM",
        "Redis",
        "BullMQ",
        "AWS S3",
      ],
      links: [
        {
          icon: <Icons.github className="size-3.5" />,
          type: "GitHub",
          href: "https://github.com/Jaemm/Login_CRM_Backend.git",
        },
      ],
      image: "/projects/crm/grafana_magicui_style.gif",
      video: "",
    },
    {
      title: "Analysis Collector API Server",
      href: "/projects/analysis-collector/",
      dates: "analysis 중심 모듈형 API",
      active: true,
      description:
        "분석 결과 원본 JSON과 이미지 파일을 S3에 저장하고 app/web이 같은 원본을 보도록 재구성한 NestJS 기반 analysis API입니다.",
      technologies: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "JWT",
        "AWS S3",
        "Swagger",
      ],
      links: [
        {
          icon: <Icons.github className="size-3.5" />,
          type: "GitHub",
          href: "https://github.com/Jaemm/Analysis_Collector_Backend",
        },
      ],
      image: "/projects/crm/swagger2_magicui_style.gif",
      video: "",
    },
  ],
} as const;
