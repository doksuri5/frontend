import { TINewsItemProps } from "@/components/common/List/NewsItem";
import NewsImage from "@/public/icons/news.jpg";

const DUMMY_NEWS_ITEMS: TINewsItemProps[] = Array(10).fill({
  image: NewsImage,
  title: "엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이",
  description: `윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스 매장 가능성이 있다"고 발표하면서 석유주가 이틀째 급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%) 오른 2만3300원에 거래를 마쳤다. 한국석유는 전날에도 상한가로 장을 마친 바 있다.이 외에도 한국ANKOR유전도 상한가를 찍었고, 흥구석유(024060)는 18.40% 올랐다.윤석열 대통령은 전날 용산 대통령실에서 열린 국정 브리핑에서 "포항 영일만 앞바다에 막대한 양의 석유와 가스가 매장돼 있을 가능성이 높다는 물리탐사 결과가 나왔다"고 밝혔다.매장량은 최대 140억 배럴 가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할 양이라고 설명했다.`,
  publishedTime: "7",
  newspaperCompany: "문화일보",
  variant: "lineClamp-4",
});

export function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const start = (page - 1) * limit;
  const end = start + limit;
  const data = DUMMY_NEWS_ITEMS.slice(start, end);

  return new Response(
    JSON.stringify({
      data,
      page,
      totalPages: Math.ceil(DUMMY_NEWS_ITEMS.length / limit),
      totalItems: DUMMY_NEWS_ITEMS.length,
    }),
    { status: 200 },
  );
}
