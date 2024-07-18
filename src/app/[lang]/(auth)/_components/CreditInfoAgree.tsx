import CommonAgreeLayout from "./CommonAgreeLayout";

export default function CreditInfoAgree() {
  return (
    <CommonAgreeLayout title="개인(신용)정보 수집이용 동의서 (금융거래 설정용)" height="h-80">
      독수리5형제 주식회사는 「개인정보 보호법」, 「신용정보의 이용 및 보호에 관한 법률」 등 관련 법규에 따라 고객님께
      아래 사항을 안내 드리고 동의를 받고자 합니다.
      <br />
      <br />
      <strong>개인(신용)정보 수집•이용에 관한 사항</strong>
      <table border={1} cellPadding="10" cellSpacing="0" className="border-[1px] border-solid border-slate-300">
        <tbody>
          <tr>
            <td className="w-48 border-[1px] border-solid border-slate-300 p-2">
              <strong>수집·이용 목적</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ (금융)계약의 체결·유지·이행·관리·개선
              <br />
              ■ 법령상 의무이행(실명확인, 특정금융거래보고, 불공정거래예방, 적합성 확인, 해외납세 의무대상자 보고 등)
              <br />
              ■ 금융사고방지(본인확인, 이상금융거래탐지 등) 분쟁·민원처리 등 사고조사
              <br />■ 통계, 리스크 관리, 고객서비스 품질 향상
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>항목</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ 개인식별정보: 성명, 고유식별정보(외국인의 경우 생년월일, 성별 포함), 주소, 연락처, 직업, 국적, CI,
              이메일
              <br />
              ■ 거래매체관련정보: ID, 매체종류, IP 주소, MAC 주소 등 매체식별정보, 접근매체정보 등<br />
              ■ 고객확인정보(CDD/EDD): 거래목적, 예상거래, 대리인·의뢰인 등 특수관계자 정보 등<br />
              ■ 금융거래정보: 상품 및 서비스의 종류, 거래조건/일시/금액 등 거래 설정내역, 기타 생성정보 등<br />
              ■ 대리인의 경우: 대리인의 성명, 고유식별정보(외국인의 경우 생년월일, 성별 포함), 직업, 국적, 연락처,
              본인과의 관계 등<br />
              ■ 해외납세 의무대상자 정보
              <br />
              ■ US FATCA: 영문이름, 영문주소, 미국 납세자번호, 미국시민여부(시민권자, 영주권자, 세법상 거주자)
              <br />■ UN CRS: 영문이름, 영문주소, 납세의무국가(미국 외), (선택)납세자번호
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>보유 및 이용기간</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              거래종료일로부터 5년(단, 금융사고조사, 분쟁해결, 민원처리, 자본시장법(10년 이상 보관) 등 법령상 의무이행을
              위한 경우에는 분리하여 별도 보관)
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <strong>개인(신용)정보 조회에 관한 사항</strong>
      <br />
      <span>
        ※ 당사가 신용정보집중기관 또는 신용조회회사를 통하여 귀하의 개인신용정보를 조회한 기록은 타 금융기관 등에 제공될
        수 있으며, 귀하의 신용등급이 하락할 수 있음을 알려드립니다.
      </span>
      <table border={1} cellPadding="10" cellSpacing="0" className="border-[1px] border-solid border-slate-300">
        <tbody>
          <tr>
            <td colSpan={2} className="border-[1px] border-solid border-slate-300 p-2">
              본인은 다음과 같이 본인의 신용정보를 조회하는 것에 동의합니다.
            </td>
          </tr>
          <tr>
            <td className="w-48 border-[1px] border-solid border-slate-300 p-2">
              <strong>조회기관</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ 신용정보집중기관(신용정보원) 신용조회회사(나이스평가정보)
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>조회목적</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ 본 계약 (본 계약 이전 발생 거래정보 포함)의 계약유지 및 사후관리, 대출•신용카드 등 금융거래 설정여부
              결정, 신용관련 통계모형 개발 및 분석, 본인요청, 기타 금융거래 관련 업무 등
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>조회내용</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ 개인식별정보, 신용거래정보, 연체 등 채무불이행 정보, 직업·재산 등 신용능력정보, 공공기관보유정보,
              신용등급 및 평점, 타 기관의 신용정보 조회기록, 본인인증정보 등
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>유효기간</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ 상기 동의는 본 계약 소멸 시까지 효력이 유지되며 계약의 갱신 등으로 변경되는 경우에도 유효하나, 본인이
              신청한 금융거래가 귀사에 의해 거절된 경우에는 그 시점까지만 유효함. 다만, 본 계약 이전 발생한
              신용거래정보가 존재하는 경우에는 기존 계약의 소멸 시까지 유효
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <strong>고유식별정보 처리에 관한 사항</strong>
      <table border={1} cellPadding="10" cellSpacing="0" className="border-[1px] border-solid border-slate-300">
        <tbody>
          <tr>
            <td colSpan={2} className="border-[1px] border-solid border-slate-300 p-2">
              본인은 귀사가 본인의 고유식별정보를 다음과 같이 처리하는 것에 동의합니다.
            </td>
          </tr>
          <tr>
            <td className="w-48 border-[1px] border-solid border-slate-300 p-2">
              <strong>처리목적</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ 신용약정 계약을 위한 신용정보 조회ㆍ제공 등 상품계약의 체결ㆍ유지ㆍ이행ㆍ관리ㆍ개선, 본인 여부 확인,
              법령상 의무이행, 금융사고 조사, 분쟁ㆍ민원처리
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>처리항목</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ 주민등록번호, 여권번호, 운전면허번호, 외국인등록번호, 국내거소신고번호
            </td>
          </tr>
          <tr>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              <strong>비고</strong>
            </td>
            <td className="border-[1px] border-solid border-slate-300 p-2">
              ■ 제공받는 자와 (제공받는 자의) 보유이용기간은 수집•이용 동의서 상의 내용과 같음
            </td>
          </tr>
        </tbody>
      </table>
      ※ 본인은 (신용)정보 수집•이용•제공에 관한 고객 권리 안내문의 내용을 충분하게 이해하였습니다.
      <br />
      동의를 거부하는 경우에 대한 안내:
      <br />
      고객님은 개인(신용)정보 수집이용 동의를 거부할 권리가 있습니다. 다만, 본 동의는 계좌개설 또는 상품계약•체결•이행
      등을 위한 필수 동의이므로 동의를 거부하는 경우 계좌개설 또는 상품계약•체결•이행이 불가합니다.
      <br />
      <br />
      <strong>
        ※ 개인정보 처리 방침(또는 신용정보활용체제의 공시)은 당사 인터넷 홈페이지를 통하여 공시되므로, 상세한 내용은
        홈페이지에서 확인할 수 있습니다.
      </strong>
      <br />
      ※ 고객이 만 14세 미만인 경우에는 법정대리인(부•모 등 친권자, 후견인 등)만이 동의 할 수 있습니다.
      <br />
      ※ 동의자가 대리인인 경우, 명의인이 대리인에게 명시적으로 위임장 등에 선택동의서의 동의까지 위임한 경우가 아니라면
      대리인은 명의인의 필수 동의서에 한해 동의할 수 있음을 알려 드립니다.
      <br />
      ※ 본 동의서에서 언급하는 거래종료일은 고객이 보유하고 있는 모든 계좌의 적극적 폐쇄 및 모든 상품의 계약 해지가
      이루어지는 시점을 말합니다.
      <br />※ 7일 내 계좌개설 미완료 시 계좌개설 과정에서 수집된 모든정보는 삭제됩니다.
    </CommonAgreeLayout>
  );
}
