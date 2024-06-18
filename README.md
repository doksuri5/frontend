
## 📌Git Commit Convention

타입 이름	설명
feat	새로운 기능 개발
fix	버그 수정
refactor	코드 리팩토링
doc	문서 추가/수정
design	css 등 사용자 ui 디자인 추가/수정
style	코드 포맷 변경, 세미콜론 누락, 코드 수정 없는 경우
config	환경 설정 추가/삭제/변경
test	테스트 코드
rename	파일 or 디렉토리 수정하거나 옮기는 작업
remove	파일 or 디렉토리 삭제하는 작업
comment	필요한 주석 추가 및 변경
chore	빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, production code 변경 없음
📋 commit message 구조
commit message는 제목/본문/꼬리말로 구성한다. 또한 내용은 한글로 작성한다.
type: [#issueNumber] subject // 제목

body (선택사항) // 본문

footer (선택사항) // 꼬리말

type: 어떤 의미로 커밋을 작성했는지 나타낸다. (ex. feat, fix, refactor etc)
subject: 커밋의 제목을 간략하게 작성
body: 무엇을, 왜 변경했는지 상세한 내용을 작성
footer: issue tracker id를 명시하고 싶은 경우에 작성

🪄 제목
제목은 1~2문장 이내로 작성한다. (50글자 이내)
마침표 및 특수 기호는 사용하지 않는다.
간결하고 요점을 중심으로 작성한다.
명령조 / 행위를 중점으로 작성한다.

🪄 본문
제목에 담을 수 없는 상세 설명이 필요할 때 작성한다. (선택사항)
어떻게보다 무엇을, 왜 변경했는지 상세하게 작성한다.
제목과 구분하기 위해 공백 한 줄을 띄워서 작성한다.

🪄 꼬리말
issue tracker id를 명시하고 싶은 경우에 작성한다. (선택사항)
유형: # 이슈 번호 형식으로 작성한다.
여러 개의 이슈 번호는 쉼표로 구분한다.
이슈 트래커 유형은 다음 중 하나를 사용한다.
fixes: 이슈 수정중 (아직 해결되지 않는 경우)
resolves: 이슈를 해결했을 때 사용
ref: 참고할 이슈가 있을 때 사용
related to: 해당 커밋에 관련된 이슈 번호 (아직 해결되지 않은 경우)

🖥️ 사용 예시
feat: #4 회원 가입 기능 구현

sms, 이메일 중복확인 api 개발

resolves: #123
ref: #456
related to: #48, #45

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
