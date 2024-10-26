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
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [selectIndex, setSelectIndex] = useState<number | null>(null);
  const [selectIndexs, setSelectIndexs] = useState<number[]>([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ImageData.length);
    setSelectIndex(randomIndex);
    setSelectIndexs([randomIndex]);
  }, []);

  //랜덤 인덱스 선택 함수
  const restartClick = () => {
    setIsShowIcon(false);

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
  };

  return (
    <S.Container>
      {selectIndex !== null && (
        <>
          <IconWrap
            isShowIcon={isShowIcon}
            selectIndex={selectIndex}
            restartClick={restartClick}
            setIsMainPage={setIsMainPage}
          />
          <ScratchCard
            isShowIcon={isShowIcon}
            setIsShowIcon={setIsShowIcon}
            selectIndex={selectIndex}
          />
          <KakaoAdfitBottom />
        </>
      )}
    </S.Container>
  );
};

export default ResultPage;
