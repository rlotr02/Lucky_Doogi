import HomeIcon from "@icons/Home.svg?react";
import InstagramIcon from "@icons/Instagram.svg?react";
import LinkIcon from "@icons/Link.svg?react";
import RestartIcon from "@icons/Restart.svg?react";
import SaveIcon from "@icons/Save.svg?react";
import * as S from "@styles/IconWrapStyle";
import { ImageData } from "@/constants/ImageData";
import { useEffect, useState } from "react";

const IconWrap = ({
  selectIndex,
  isShowIcon,
  restartClick,
  setIsMainPage,
}: {
  selectIndex: number;
  isShowIcon: boolean;
  restartClick: () => void;
  setIsMainPage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isClickIcon, setIsClickIcon] = useState(false);

  useEffect(() => {
    if (!isShowIcon) {
      setIsClickIcon(false);
    }
  }, [isShowIcon]);

  return (
    <S.Container>
      <S.LogoText
        $isShowIcon={isShowIcon}
        onClick={() => setIsMainPage(true)}
        style={{ pointerEvents: !isShowIcon ? "auto" : "none" }}
      >
        LUCKY DOOGI
      </S.LogoText>
      <S.IconWrap
        $isShowIcon={isShowIcon}
        $color={ImageData[selectIndex].color}
        onTransitionEnd={() => setIsClickIcon(true)}
        style={{ pointerEvents: isClickIcon ? "auto" : "none" }}
      >
        <HomeIcon
          onClick={() =>
            window.open("https://www.instagram.com/doogi_official")
          }
        />
        <InstagramIcon
          onClick={() => window.open("https://www.instagram.com/rlotr.dev")}
        />
        <LinkIcon onClick={() => window.open("https://litt.ly/rlotr02")} />
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
