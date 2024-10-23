import styled from "styled-components";

export const Container = styled.div<{ $isLoad: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;

  opacity: ${(props) => (props.$isLoad ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
  user-select: none;
`;

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 320px;
  height: 325px;
  background-size: cover;
  background-repeat: no-repeat;

  padding: 35px 0 27px;

  > h1 {
    font: var(--H1);
    color: var(--Black);
  }

  > h3 {
    font: var(--H3);
    color: var(--Black);
    white-space: pre-wrap;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  > button {
    font: var(--H2);
    color: var(--Black);
    background-size: cover;
    background-repeat: no-repeat;
    background-color: transparent;
    border: none;
    width: 320px;
    height: 77px;
  }

  > h4 {
    font: var(--H4);
    color: var(--Main);
    cursor: pointer;
  }
`;
