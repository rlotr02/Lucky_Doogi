import styled from "styled-components";

export const Container = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 5px;

  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
`;
