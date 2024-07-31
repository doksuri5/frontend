export const getTimeDifference = (dateString: string, lang: string) => {
  // 주어진 날짜를 Date 객체로 변환
  const givenDate = new Date(dateString.replaceAll(".", "-").replace(" ", "T") + ":00+09:00"); // KST 시간대

  // 현재 시간을 KST로 설정
  const now = new Date();
  const nowKST = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

  // 두 시간의 차이를 밀리초로 계산
  const diffInMs = nowKST.getTime() - givenDate.getTime();

  // 차이를 일 단위와 시간 단위로 변환
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  const dayAgoLang = {
    ko: "일 전",
    en: "day(s) ago",
    jp: "日前",
    ch: "天前",
    fr: "il y a jour(s)",
  };

  const timeAgoLang = {
    ko: "시간 전",
    en: "hour(s) ago",
    jp: "時間前",
    ch: "小时前",
    fr: "il y a heure(s)",
  };

  if (diffInDays >= 10) {
    return dateString.split(" ")[0];
  } else if (diffInDays >= 1) {
    return `${diffInDays}${lang && dayAgoLang[lang as keyof typeof dayAgoLang]}`;
  } else {
    return `${diffInHours}${lang && timeAgoLang[lang as keyof typeof timeAgoLang]}`;
  }
};
