import HomeIcon from "@icons/Home.svg?react";
import DeveloperIcon from "@icons/Developer.svg?react";
import HeartIcon from "@icons/Heart.svg?react";
import RestartIcon from "@icons/Restart.svg?react";
import SaveIcon from "@icons/Save.svg?react";
import * as S from "@styles/IconWrapStyle";
import { ImageData } from "@/constants/ImageData";

const IconWrap = ({
  selectIndex,
  isShowIcon,
  restartClick,
  setIsMainPage,
  isClickIcon,
}: {
  selectIndex: number;
  isShowIcon: boolean;
  restartClick: () => void;
  setIsMainPage: React.Dispatch<React.SetStateAction<boolean>>;
  isClickIcon: boolean;
}) => {
  return (
    <S.Container>
      <S.LogoText $isShowIcon={isShowIcon} onClick={() => setIsMainPage(true)}>
        LUCKY DOOGI
      </S.LogoText>
      <S.IconWrap
        $isShowIcon={isShowIcon}
        $color={ImageData[selectIndex].color}
        style={{ pointerEvents: isClickIcon ? "auto" : "none" }}
      >
        <HomeIcon onClick={() => setIsMainPage(true)} />
        <DeveloperIcon onClick={() => window.open("https://litt.ly/rlotr02")} />
        <HeartIcon onClick={() => window.open("https://litt.ly/doofficial")} />
        <RestartIcon onClick={restartClick} />
        <a
          href={ImageData[selectIndex].image}
          download={ImageData[selectIndex].name}
        >
          <SaveIcon />
        </a>
      </S.IconWrap>
    </S.Container>
  );
};

export default IconWrap;
