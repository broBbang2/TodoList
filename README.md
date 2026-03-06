# TodoList (TaskFlow)

간단한 할 일 관리 대시보드입니다.  
로컬 스토리지를 활용해 브라우저에 할 일 목록을 저장하고, 진행률 카드와 필터로 현재 상태를 한눈에 볼 수 있습니다.

## 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

브라우저에서 `http://localhost:3000` 에 접속하면 앱을 확인할 수 있습니다.

## 주요 화면

- `/` : 소개 페이지 (TaskFlow 설명 및 대시보드로 이동 버튼)
- `/dashboard` : 할 일 CRUD, 상태 필터, 통계 카드가 있는 메인 대시보드

## 기술 스택

- Next.js (App Router)
- TypeScript
- Tailwind CSS

