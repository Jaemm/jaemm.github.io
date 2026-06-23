import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { NextjsIconDark } from "@/components/ui/svgs/tech/nextjsIconDark";
import { Nestjs } from "@/components/ui/svgs/tech/nestjs";
import { Postgresql } from "@/components/ui/svgs/tech/postgresql";
import { Redis } from "@/components/ui/svgs/tech/redis";
import { Docker } from "@/components/ui/svgs/tech/docker";
import { Kubernetes } from "@/components/ui/svgs/tech/kubernetes";
import { Aws } from "@/components/ui/svgs/tech/aws";

export const DATA = {
  name: "최재민",
  initials: "CJ",
  url: "https://jaemm.github.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "백엔드와 풀스택 개발을 중심으로 서비스 품질과 안정성을 함께 챙기는 개발자입니다.",
  summary:
    "2019년부터 소프트웨어 품질 관리, 풀스택 개발, 백엔드 개발까지 다양한 역할을 맡아 왔습니다.\n\nSK네트웍스서비스에서 품질 관리 업무를 시작했고, 퍼스트씨앤디에서는 풀스택 개발을, 초이스테크에서는 백엔드 개발을 담당하고 있습니다. 현재는 서비스 안정성과 개발 생산성을 함께 높이는 일을 중요하게 생각합니다.",
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
      location: "소프트웨어 품질 관리",
      title: "소프트웨어 품질 관리",
      logoUrl: "/logos/sk.jpg",
      start: "2019년",
      end: "2021년",
      description:
        "주요 업무: 테스트 검증 · 품질 관리 · 배포 안정화.",
    },
    {
      company: "퍼스트씨앤디",
      href: "#",
      badges: [],
      location: "소프트웨어 개발팀",
      title: "풀스택 개발자",
      logoUrl: "/logos/firstcnd.avif",
      start: "2022년",
      end: "2024년",
      description:
        "기술스택: Next.js · Express · DynamoDB · AWS · Docker.",
    },
    {
      company: "초이스테크",
      href: "https://www.choicetech.co.kr",
      badges: [],
      location: "개발팀",
      title: "백엔드 개발자",
      logoUrl: "/logos/ctk.avif",
      start: "2024년",
      end: "현재",
      description:
        "기술스택: NestJS · PostgreSQL · Docker · Redis · Kubernetes · Nginx · AWS.",
    },
  ],
  education: [
    {
      school: "수원과학대학교",
      href: "https://sist.ac.kr",
      degree: "컴퓨터정보과",
      logoUrl: "/logos/suwonscience.png",
      start: "2014년",
      end: "2019년",
    },
    {
      school: "그린컴퓨터아카데미",
      href: "https://www.greenart.co.kr/",
      degree: "Java & Spring 웹 개발자 교육",
      logoUrl: "/logos/greenart.svg",
      start: "2021년",
      end: "2022년",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "2024년",
      active: true,
      description:
        "GPT 사용자로부터 이메일을 수집해 리드 확보와 전환을 돕는 SaaS입니다.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "2023년 ~ 현재",
      active: true,
      description:
        "개발자를 위한 애니메이션 UI 컴포넌트를 설계하고 제공하는 제품입니다.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "2023년",
      active: true,
      description:
        "OpenAI API 요청 로그와 비용을 분석하는 오픈소스 로깅·분석 플랫폼입니다.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "2023년 ~ 2024년",
      active: true,
      description:
        "최신 GPT 모델로 고객 문의를 자동 응답하는 AI 고객지원 챗봇입니다.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
} as const;
