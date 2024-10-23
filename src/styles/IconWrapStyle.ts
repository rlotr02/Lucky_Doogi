import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 38px;
  width: 320px;
`;

export const IconWrap = styled.div<{ $isShowIcon: boolean; $color: string }>`
  position: absolute;
  display: flex;
  gap: 10px;
  opacity: ${(props) => (props.$isShowIcon ? 1 : 0)};
  transition: ${(props) => props.$isShowIcon && "opacity 0.6s ease-in-out"};

  svg {
    color: ${(props) => props.$color};
    cursor: pointer;
  }
`;

export const LogoText = styled.h1<{ $isShowIcon: boolean }>`
  position: absolute;
  opacity: ${(props) => (props.$isShowIcon ? 0 : 1)};
  transition: ${(props) => !props.$isShowIcon && "opacity 0.6s ease-in-out"};

  font: var(--H1);
  color: var(--Black);
  user-select: none;
`;
