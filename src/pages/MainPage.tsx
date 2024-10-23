import { useState } from "react";
import * as S from "@styles/MainPageStyle";
import MainImg from "@images/Main.png";
import MainDoogiImg from "@images/MainDoogi.png";
import ButtonImg from "@images/Button.png";
import KakaoAdfitBottom from "@components/adfit/KakaoAdfitBottom";

const MainPage = ({
  setIsMainPage,
}: {
  setIsMainPage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoad, setIsLoad] = useState(false);

  return (
    <S.Container $isLoad={isLoad}>
      <S.MainWrap
        style={{
          backgroundImage: `url(${MainImg})`,
        }}
      >
        <h1>LUCKY DOOGI</h1>
        <img
          src={MainDoogiImg}
          width={137}
          height={137}
          onLoad={() => setIsLoad(true)}
        />
        <h3>
          {`카드를 긁으면 랜덤으로 부적이 나와요!\n어떤 행운이 당신을 기다리고 있을까요?`}
        </h3>
      </S.MainWrap>
      <S.ButtonWrap>
        <button
          style={{
            backgroundImage: `url(${ButtonImg})`,
          }}
          onClick={() => setIsMainPage(false)}
        >
          카드 긁고 부적 확인하기
        </button>
        <h4 onClick={() => window.open("https://github.com/rlotr02")}>
          ⓒ 2024. rlotr02 All rights reserved.
        </h4>
      </S.ButtonWrap>
      <KakaoAdfitBottom />
    </S.Container>
  );
};

export default MainPage;
