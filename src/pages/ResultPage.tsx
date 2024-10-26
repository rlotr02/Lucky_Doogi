import { useEffect, useState } from "react";
import * as S from "@styles/ResultPageStyle";
import { ImageData } from "@constants/ImageData";
import ScratchCard from "@components/ScratchCard";
import IconWrap from "@components/IconWrap";
import KakaoAdfitBottom from "@components/adfit/KakaoAdfitBottom";

const ResultPage = ({
  setIsMainPage,
}: {
  setIsMainPage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isClickIcon, setIsClickIcon] = useState(false);
  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const [selectIndexs, setSelectIndexs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ImageData.length);
    setSelectIndex(randomIndex);
    setSelectIndexs([randomIndex]);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  //랜덤 인덱스 선택 함수
  const restartClick = () => {
    setIsShowIcon(false);
    setIsClickIcon(false);

    const availableIndices = Array.from(
      { length: ImageData.length },
      (_, index) => index
    ).filter((index) => !selectIndexs.includes(index));

    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];

    setSelectIndex(randomIndex);
    setSelectIndexs((prevSelectIndexs) => {
      const newSelectIndexs = [...prevSelectIndexs, randomIndex];

      if (newSelectIndexs.length >= ImageData.length) {
        return [];
      }

      return newSelectIndexs;
    });

    setIsLoading(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false); // 이미지가 로드되면 로딩 상태 해제
  };

  return (
    <S.Container $isVisible={isVisible}>
      {selectIndex !== null && (
        <>
          <IconWrap
            isShowIcon={isShowIcon}
            selectIndex={selectIndex}
            restartClick={restartClick}
            setIsMainPage={setIsMainPage}
            isClickIcon={isClickIcon}
          />
          <div style={{ display: "flex" }}>
            {isLoading && <p>Loading...</p>}
            <img
              src={ImageData[selectIndex].image}
              height={50}
              alt="Random Image"
              onLoad={handleImageLoad} // 이미지 로드 이벤트
              style={{ display: isLoading ? "none" : "block" }} // 로딩 중에는 숨김
            />
            <p>{selectIndex}</p>
          </div>
          <ScratchCard
            isShowIcon={isShowIcon}
            setIsShowIcon={setIsShowIcon}
            selectImage={ImageData[selectIndex].image}
            setIsClickIcon={setIsClickIcon}
          />
          <KakaoAdfitBottom />
        </>
      )}
    </S.Container>
  );
};

export default ResultPage;
