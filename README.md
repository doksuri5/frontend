# 아잇나우

## 목차

### 1. [프로젝트 소개](#intro)

- 개발 배경 및 목적, 주요 기능 등
- 개발 기간
- 프로젝트 사용법

### 2. [팀원 소개 및 담당 기능](#role)

### 3. [기술 스택](#tech)

### 4. [아키텍처](#architecture)

### 5. [주요 기능](#feature)

### 6. [화면 구성](#screen)

### 7. [트러블슈팅](#trouble)

### 8. [협업](#convention)

### 9. [폴더 구조](#directory)

<br>
<br>

## <span id="intro">1. 프로젝트 소개</span>

### [🔗 아잇나우 바로가기](https://aightnow.org)

### [📑 API Swagger 문서](https://api.aightnow.org/api-docs)

<br>

### 테스트 아이디

<li style="font-size: 18px"><strong>ID<strong> : <span>test@gmail.com<span></li>
<li style="font-size: 18px"><strong>PW<strong> : <span>test1234!<span></li>

<br>

### 실시간 주식 및 뉴스 데이터를 분석해 다국어 맞춤형 기업 분석 리포트를 제공하는 AI 플랫폼

<p align="center">
<img width="" alt="스크린샷 2024-02-04 225114" src="https://github.com/user-attachments/assets/6a8eeee1-f645-4262-b7e2-208fd967f30e">
</p>
<br>

### 개발 기간

- 2024년 06월 17일(월) ~ 2024년 08월 02일(금)<br>
<p align="center">
  <img width="90%" align="center" alt="스크린샷 2024-02-04 224423" src="https://github.com/user-attachments/assets/dc64f105-59eb-4b82-9d53-7677afd4e5f0">
</p>

<br>

### 프로젝트 사용법

- 구동법

  ```
  $ git clone https://github.com/doksuri5/frontend.git client
  $ cd client
  $ npm install
  $ npm run dev
  ```

- .env.development

  ```
  NEXT_PUBLIC_BASE_URL=
  NEXT_PUBLIC_API_BASE_URL=

  OPENAI_API_KEY=

  MONGODB_URI=
  KV_URL=
  KV_REST_API_URL=
  KV_REST_API_TOKEN=
  KV_REST_API_READ_ONLY_TOKEN=

  AUTH_SECRET=

  DEEPL_API_KEY=
  OPEN_API_CURRENCY=

  KAKAO_CLIENT_ID=
  KAKAO_CLIENT_SECRET=
  KAKAO_REDIRECT_URL=

  NAVER_CLIENT_ID=
  NAVER_CLIENT_SECRET=
  NAVER_REDIRECT_URL=

  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
  GOOGLE_REDIRECT_URL=

  ```

- .env.production

  ```
  NEXT_PUBLIC_BASE_URL=
  NEXT_PUBLIC_API_BASE_URL=

  OPENAI_API_KEY=

  ...
  ```

<br>
<br>

## <span id='role'>2. 팀원 소개 및 담당 기능</span>

![image](https://github.com/user-attachments/assets/cd2a3666-3dca-4131-aecb-3a75c0228077)

<br>
<br>

## <span id='tech'>3. 기술 스택</span>

<table>
<tr>
 <td align="center" width="150px">Environment</td>
 <td>
  <img alt='Visual Studio Code' src='https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white' />&nbsp 
  <img alt='Git' src='https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white' />&nbsp 
  <img alt='Github' src='https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white' />&nbsp 
 </td>
</tr>
<tr>
 <td align="center">Package Manager</td>
 <td>
  <img alt='npm' src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white' />&nbsp 
 </td>
</tr>
<tr>
 <td align="center">Development</td>
 <td>
  <img alt='Next.js' src='https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white' />&nbsp;
  <img alt='Next-Auth' src='https://img.shields.io/badge/next_auth-000000?style=for-the-badge&logo=data:image/png%2bxml;base64,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&logoColor=white' />&nbsp;
  <img alt='TypeScript' src='https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white' />&nbsp;
  <img alt='Zod' src='https://img.shields.io/badge/-Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white' />&nbsp;
  <img alt='Tailwind' src='https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC' />&nbsp;
  <img alt='Shadcn' src='https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white' />&nbsp;
  <img alt='Vercel' src='https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white' />&nbsp;
  <img alt='Tanstack Query' src='https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white' />&nbsp;
  <img alt='Zustand' src='https://img.shields.io/badge/zustand-black?style=for-the-badge&logo=data:image/png%2bxml;base64,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&logoColor=white' />&nbsp;
  <img alt='Node' src='https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white' />&nbsp;
  <img alt='Express' src='https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white' />&nbsp;
  <img alt='prettier' src='https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white' />&nbsp;
  <img alt='eslint' src='https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white' />&nbsp;
 </td>
</tr>
<tr>
 <td align="center">Infrastructure</td>
 <td>
  <img alt='AWS EC2' src='https://img.shields.io/badge/AWS_EC2-dd7b21?logo=amazonec2&logoColor=fff&style=for-the-badge' />&nbsp;
  <img alt='AWS S3' src='https://img.shields.io/badge/AWS_S3-569A31?logo=amazons3&logoColor=fff&style=for-the-badge' />&nbsp;
  <img alt='AWS Route 53' src='https://img.shields.io/badge/AWS_ROUTE53-693cc5?logo=amazonroute53&logoColor=fff&style=for-the-badge' />&nbsp;
  <img alt='MongoDB' src='https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white' />&nbsp;
 </td>
</tr>
<tr>
 <td align="center">Communication</td>
 <td>
   <img alt='Jira' src='https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white' />&nbsp;
   <img alt='Discord' src='https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white' />&nbsp;
   <img alt='Notion' src='https://img.shields.io/badge/Notion-white?style=for-the-badge&logo=Notion&logoColor=black' />&nbsp;
 </td>
</tr>
</table>


<br>
<br>

## <span id='architecture'>4. 아키텍처</span>

<p align="center">
  <img width="100%" alt="스크린샷 2024-02-04 224654" src="https://github.com/user-attachments/assets/ef17c956-1cfa-49d3-ba15-58c31fd99cbd">
</p>

<br /><br />

## <span id='feature'>5. 주요 기능</span>

<br />
<strong>클라이언트</strong>
<ul>
  <li style="margin-bottom: 8px">Vercel을 사용하여 Next.js 클라이언트 배포</li>
  <li style="margin-bottom: 8px">Next-Auth를 사용하여 인증 시스템 구현</li>
  <li style="margin-bottom: 8px">Nodemailer를 사용하여 이메일 전송</li>
  <li style="margin-bottom: 8px">Zod로 타입 스키마를 정의하고 React Hook Form을 통해 form 상태 및 validation을 효율적으로 관리</li>
  <li style="margin-bottom: 8px">Zod를 활용한 API 헬퍼 함수 구현</li>
  <li style="margin-bottom: 8px">검색할 때, 디바운스 적용 및 es-hangul을 사용하여 초성 검색 허용</li>
  <li style="margin-bottom: 8px">백엔드 세션을 브라우저 쿠키에 저장하여 로그인 여부 판별</li>
  <li style="margin-bottom: 8px">Server Sent Event(SSE)를 통한 실시간 주식 시세 데이터 처리</li>
  <li style="margin-bottom: 8px">ChatGPT API와 Vercel Streaming을 활용한 챗봇 구현 및 실시간 응답 처리</li>
  <li style="margin-bottom: 8px">Vercel Cron Jobs를 사용하여 주기적으로 환율 데이터 자동 수집 및 업데이트</li>
  <li style="margin-bottom: 8px">Next-Intl API 다국어 적용 및 미들웨어를 통한 국제화 경로 설정</li>
  <li style="margin-bottom: 8px">구글, 네이버 서치 콘솔 등록 및 메타태그 활용으로 SEO 적용</li>
</ul>

<br />
<strong>서버</strong>
<ul>
  <li style="margin-bottom: 8px">Node.js Express로 API 서버 구축</li>
  <li style="margin-bottom: 8px">RESTful API 및 서버 라우트 설정을 통한 API 통신</li>
  <li style="margin-bottom: 8px">유저 로그인 시 Express 세션을 생성하고 이를 클라이언트 쿠키로 전달</li>
  <li style="margin-bottom: 8px">AWS S3를 사용하여 프로필 이미지 관리</li>
  <li style="margin-bottom: 8px">Node.js Express로 크롤링 서버 구축</li>
  <li style="margin-bottom: 8px">Cron-job을 사용하여 주기적인 뉴스 데이터 크롤링 구현</li>
  <li style="margin-bottom: 8px">크롤링 시 DeepL을 사용하여 언어 번역 후 각 언어별로 데이터베이스에 저장</li>
  <li style="margin-bottom: 8px">몽고디비를 사용하여 데이터베이스 관리</li>
</ul>

<br />
<strong>인프라</strong>
<ul>
  <li style="margin-bottom: 8px">AWS EC2로 API 서버, 크롤링 서버 배포 진행</li>
  <li style="margin-bottom: 8px">PM2를 설정하여 배포 서버 자동 실행 적용</li>
  <li style="margin-bottom: 8px">AWS Route53으로 도메인 설정 후 클라이언트는 메인 도메인 연결, API 서버는 서브 도메인 연결</li>
</ul>

<br>
<br>

## <span id='screen'>6. 화면 구성</span>

### 1) 로그인 전 메인 페이지 <br>

<div style="display: flex; justify-content: center;" >
  <img src='https://github.com/user-attachments/assets/e5f263a2-fb97-4897-bfb9-da461423fcba' width="600"/>
</div>

<hr>
<br><br>

### 2) 로그인 페이지 <br>

<div style="display: flex; flex-direction: column; justify-content: center;" >
  <img src='https://github.com/user-attachments/assets/b98f93f1-b0f7-4db5-bfd6-30f7919d603c' width="100%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">아잇나우 회원가입으로 진행한 경우 일반 이메일 로그인 진행</li>
    <li style="margin-bottom: 5px">SNS 회원가입으로 진행한 경우 SNS 로그인(구글, 네이버, 카카오) 진행</li>
    <li style="margin-bottom: 5px">'자동로그인' 체크 시 일주일간 자동 로그인</li>
  </ul>
</div>

<hr>
<br><br>

### 3) 이메일, 비빌번호 찾기 페이지 <br>

<div style="display: flex; flex-direction: column; justify-content: center;" >
  <img src='https://github.com/user-attachments/assets/c0122599-535d-4d23-8ac6-4f6fa97d7c92' width="100%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">이름과 핸드폰 번호로 이메일을 찾을 수 있음</li>
    <li style="margin-bottom: 5px">이름과 이메일로 임시 비밀번호를 발급하여 입력한 이메일로 전송</li>
    <li style="margin-bottom: 5px">임시 발급한 비밀번호로 로그인 진행</li>
  </ul>
</div>

<hr>
<br><br>

### 4) 회원가입 <br>

<table
  style="width: 100%; border-collapse: collapse; text-align: center;"
>
  <tr>
    <td
      style="border: 1px solid #ddd;"
    >
      <img
        src="https://github.com/user-attachments/assets/02538514-69fc-42f7-b50b-eaf690008e98"
        alt="약관동의"
        style="width: 100%; height: auto;"
      />
      <p>[약관동의]</p>
    </td>
    <td
      style="border: 1px solid #ddd;"
    >
      <img
        src="https://github.com/user-attachments/assets/0c8b8516-e60a-4822-ae4f-67060c113663"
        alt="회원가입 폼"
        style="width: 100%; height: auto;"
      />
      <p>[회원가입 폼]</p>
    </td>
    <td
      style="border: 1px solid #ddd;"
    >
      <img
        src="https://github.com/user-attachments/assets/43e34e5a-e4f6-4a1d-af72-9508a27687b5"
        alt="프로필 설정"
        style="width: 100%; height: auto;"
      />
      <p>[프로필 설정]</p>
    </td>
    <td
      style="border: 1px solid #ddd;"
    >
      <img
        src="https://github.com/user-attachments/assets/4832d857-6067-4a45-bb6c-5fbd4374a13e"
        alt="투자 성향 진단"
        style="width: 100%; height: auto;"
      />
      <p>[투자 성향 진단]</p>
    </td>
  </tr>
</table>
<br>
<ul style="font-size: 16px">
  <li style="margin-bottom: 5px">이메일 인증 후 회원가입 진행</li>
  <li style="margin-bottom: 5px">SNS 회원가입의 경우 각 소셜마다 제공하는 정보 외의 나머지를 입력하여 회원가입 진행</li>
  <li style="margin-bottom: 5px">투자 성향 진단을 통해 유저 별 맞춤형 챗봇 답변 및 개인화된 주식 리포트를 제공</li>
</ul>

<hr>
<br><br>

### 5) 메인 페이지 <br>

<div style="display: flex; flex-direction: column; justify-content: center;" >
  <img src='./public/images/main_page_gif.gif' width="100%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">실시간 주식 시세 제공</li>
    <li style="margin-bottom: 5px">1년 이상의 주식 데이터를 분석하여 그래프 생성</li>
    <li style="margin-bottom: 5px">관심 종목별 뉴스 제공</li>
    <li style="margin-bottom: 5px">주요 뉴스 및 최신 뉴스 제공</li>
  </ul>
</div>

<hr>
<br><br>

### 6) 챗봇 <br>

<div style="display: flex; flex-direction: column; justify-content: center; align-items:">
  <img src='https://github.com/user-attachments/assets/d4259134-92e4-44c9-a646-58d5940f4f4f' width="45%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">AI가 필요한 경우 자동으로 함수를 호출해 최신 주식 정보를 실시간으로 제공</li>
    <li style="margin-bottom: 5px">검색에 대해 주식 조회 (최대 3개 종목)</li>
    <li style="margin-bottom: 5px">6가지 종목에 대한 종목 설명 제공</li>
    <li style="margin-bottom: 5px">그래프 투자 지표에 대한 설명 제공</li>
  </ul>
</div>

<hr>
<br><br>

### 7) 발견 페이지 <br>

<div style="display: flex; flex-direction: column; justify-content: center; align-items:">
  <img src='https://github.com/user-attachments/assets/cea0d89b-1bf0-4cf3-b3e8-49040e9f6a05' width="100%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">영어 검색 및 한글 초성 검색 가능</li>
    <li style="margin-bottom: 5px">검색 조회수에 따른 인기 검색어를 1시간 단위로 제공</li>
    <li style="margin-bottom: 5px">검색된 주식 클릭 시 해당 주식 리포트 페이지로 이동</li>
    <li style="margin-bottom: 5px">검색된 뉴스 클릭 시 뉴스 상세 페이지로 이동</li>
    <li style="margin-bottom: 5px">최근 검색어는 개별 삭제 및 전체 삭제 가능</li>
  </ul>
</div>

<hr>
<br><br>

### 8) 뉴스 페이지 <br>

<div style="display: flex; flex-direction: column; justify-content: center; align-items:">
  <img src='./public/images/new_page_gif.gif' width="100%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">유저가 선택한 언어에 따른 뉴스 기사 제공</li>
    <li style="margin-bottom: 5px">상세 페이지에서는 기사와 관련된 주식 종목 및 관련 기사 제공</li>
    <li style="margin-bottom: 5px">AI 요약 기능으로 기사에 요약 내용 제공</li>
  </ul>
</div>

<hr>
<br><br>

### 9) 관심 종목 페이지 <br>

<div style="display: flex; flex-direction: column; justify-content: center; align-items:">
  <img src='https://github.com/user-attachments/assets/27346c56-273f-42f7-b616-d05d49159aff' width="100%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">관심 종목이 하나도 없으면 모달 창이 나오게 됨</li>
    <li style="margin-bottom: 5px">영어 및 한글 초성 검색으로 종목 검색 후 종목 추가 및 삭제 진행</li>
    <li style="margin-bottom: 5px">관심 종목을 삭제하거나 리포트 페이지로 이동</li>
    <li style="margin-bottom: 5px">'관심종목 추가' 버튼 클릭 시 모달 창이 나오게 됨</li>
  </ul>
</div>

<hr>
<br><br>

### 10) 마이 페이지 <br>

<div style="display: flex; flex-direction: column; justify-content: center; align-items:">
  <img src='https://github.com/user-attachments/assets/1fb97f6d-3d58-4dc2-8c9b-2c2ada3958bd' width="100%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">프로필, 개인정보, 투자 성향 수정할 수 있음</li>
    <li style="margin-bottom: 5px">회원 탈퇴의 경우 비밀번호를 입력해야 함</li>
    <li style="margin-bottom: 5px">언저 설정 탭에서 전체 페이지의 언어를 변경할 수 있음</li>
    <li style="margin-bottom: 5px">이용약관 확인</li>
  </ul>
</div>

<hr>
<br><br>

### 11) 리포트 페이지 <br>

<div style="display: flex; flex-direction: column; justify-content: center; align-items:">
  <img src='./public/images/report_page_gif.gif' width="100%"/>
  <br>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">실시간 주식 시세 제공 및 기업 정보 제공</li>
    <li style="margin-bottom: 5px">일, 주, 월, 분기, 년 등 주가 차트 제공</li>
    <li style="margin-bottom: 5px">GPT를 활용한 종목 분석 리포트 제공</li>
  </ul>
</div>

<hr>
<br><br>

<br>

## <span id='trouble'>7. 트러블슈팅</span>

### [🖼️ Next.js에서 SVG 사용하는 방법](https://github.com/doksuri5/frontend/issues/21)

### [🔒 next-auth 네이버 소셜 로그인 oauth 오류 및 해결](https://github.com/doksuri5/frontend/issues/56)

### [🍪 백엔드 서버(Node.js)와 클라이언트 서버(Next.js) 간의 쿠키 전달 문제 발생 및 해결](https://github.com/doksuri5/frontend/issues/58)

<br>

## <span id='convention'>8. 협업</span>

### Jira를 사용하여 일정 관리

![image](https://github.com/user-attachments/assets/25152b34-b9e0-444e-807d-d25095fcff6c)

### Notion을 사용하여 협업 및 문서화
<div style="display: flex; flex-direction: column; justify-content: center; align-items: font-weight">
  <p align="center"><img src='https://github.com/user-attachments/assets/5fd8fb1c-da27-4158-a8cc-468b5b2fd1b6' height="600"/></p>
  <br>
  <p style="margin-bottom: 5px">노션 링크: https://psychedelic-mercury-b2f.notion.site/5-1a21b4fcac824f61aff61bb81fbc1192</p>
  <ul style="font-size: 16px">
    <li style="margin-bottom: 5px">모든 팀원이 개발 문서에 쉽게 접근하고 최신 정보를 유지할 수 있도록 문서 중앙화</li>
    <li style="margin-bottom: 5px">DB, API 설계서를 작성하여 각 기능에 필요한 데이터와 API를 명확히 정의</li>
    <li style="margin-bottom: 5px">회의 내용을 노션에 기록 및 공유하여 팀원들이 회의 진행 시 결정된 사항을 쉽게 참고할 수 있도록 함</li>
    <li style="margin-bottom: 5px">QA 진행 시 발생한 버그와 이슈를 노션에 트래킹하여, 해결 상태와 우선순위를 팀원들과 실시간으로 공유</li>
  </ul>
</div>

### [📕 커밋 컨벤션](https://github.com/doksuri5/frontend/wiki/%F0%9F%93%8CGit-Commit-Convention)

### [📘 코드 컨벤션](https://github.com/doksuri5/frontend/wiki/%F0%9F%93%91-Code-Convention)

<br>

## <span id='directory'>9. 디렉토리 구조</span>

```
📦NEXT-FRONTEND
 ┣ 📂.git
 ┣ 📂patches
 ┣ 📂public
 ┃ ┣ 📂icons
 ┃ ┣ 📂images
 ┣ 📂src
 ┃ ┣ 📂actions                // API 헬퍼 함수 모음
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂api                 // API Routes
 ┃ ┃ ┣ 📂[lang]
 ┃ ┃ ┃ ┣ 📂(home)           // 메인 홈 페이지 그룹
 ┃ ┃ ┃ ┗ 📂home             // 메인 홈 페이지 라우터 폴더 (폴더 이름은 케밥케이스)
 ┃ ┃ ┃ ┃ ┣ 📂_components   // 메인 홈 페이지 관련 컴포넌트
 ┃ ┃ ┃ ┃ ┃ ┗ 📂_skeleton  // 메인 홈 페이지 관련 스켈레톤 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📂_hooks        // 메인 홈 페이지 관련 커스텀 훅
 ┃ ┃ ┃ ┃ ┣ 📂_api          // 메인 홈 페이지 관련 api
 ┃ ┃ ┃ ┃ ┣ 📂_types        // 메인 홈 페이지 관련 타입
 ┃ ┃ ┃ ┃ ┣ 📂_constants    // 메인 홈 페이지 관련 상수 값
 ┃ ┃ ┃ ┃ ┣ 📂_utils        // 메인 홈 페이지 관련 유틸리티 함수
 ┃ ┃ ┃ ┃ ┣ 📜layout.tsx    // 메인 홈 페이지 레이아웃
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx      // 메인 홈 페이지
 ┃ ┃ ┃ ┣ 📂[...not-found]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜body-loading.tsx
 ┃ ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┣ 📜loading.tsx
 ┃ ┃ ┃ ┗ 📜not-found.tsx
 ┃ ┃ ┣ 📜global-error.tsx
 ┃ ┃ ┣ 📜globals.css
 ┃ ┃ ┣ 📜robots.txt
 ┃ ┃ ┗ 📜sitemap.xml
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📂icons
 ┃ ┣ 📂components      // 전역에서 사용되는 공통 컴포넌트
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂List
 ┃ ┃ ┃ ┣ 📂skeleton  // 전역에서 사용되는 common 스켈레톤 컴포넌트
 ┃ ┃ ┗ 📂layout       // 레이아웃 컴포넌트 (Header, Footer)
 ┃ ┣ 📂constants       // 전역에서 사용되는 상수 값
 ┃ ┣ 📂dictionaries    // 다국어 json
 ┃ ┣ 📂fonts
 ┃ ┣ 📂hooks
 ┃ ┣ 📂lib
 ┃ ┣ 📂models
 ┃ ┣ 📂providers
 ┃ ┣ 📂routes
 ┃ ┣ 📂scripts
 ┃ ┣ 📂stores
 ┃ ┣ 📂types
 ┃ ┣ 📂utils
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜i18n.ts
 ┃ ┗ 📜middleware.ts
 ┣ 📜.env.development
 ┣ 📜.env.example
 ┣ 📜.env.production
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜next-auth.d.ts
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.mjs
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.mjs
 ┣ 📜README.md
 ┣ 📜svgr.d.ts
 ┣ 📜tailwind.config.ts
 ┣ 📜tsconfig.json
 ┗ 📜vercel.json

```

<br>
