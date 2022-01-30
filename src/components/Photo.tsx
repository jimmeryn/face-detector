import { RefObject } from "react";
import styled from "styled-components";
import { Button } from "./Button";

const PhotoWrapper = styled.div<{ hasPhoto: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ hasPhoto }) => (hasPhoto ? 0 : "100%")};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  transition: 0.4s;
`;

const PhotoCanvas = styled.canvas`
  width: 100%;
  height: auto;
`;

type Props = {
  hasPhoto: boolean;
  photoRef: RefObject<HTMLCanvasElement>;
  clearPhoto: () => void;
};

export const Photo = ({ hasPhoto, photoRef, clearPhoto }: Props) => {
  return (
    <PhotoWrapper hasPhoto={hasPhoto}>
      <PhotoCanvas ref={photoRef} />
      <Button onClick={clearPhoto}>Clear</Button>
    </PhotoWrapper>
  );
};
