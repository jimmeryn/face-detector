import { RefObject } from "react";
import styled from "styled-components";
import { Button } from "./Button";

const VideoWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoComponent = styled.video`
  max-width: 100%;
  max-height: 100%;
  height: auto;
`;

type Props = {
  loading: boolean;
  loadingPhoto: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  getPhoto: () => void;
};

export const Video = ({ videoRef, loading, loadingPhoto, getPhoto }: Props) => {
  return (
    <VideoWrapper>
      <VideoComponent ref={videoRef} />
      {!loading && (
        <Button onClick={getPhoto} disabled={loading || loadingPhoto}>
          {loadingPhoto ? "Loading..." : "Shoot"}
        </Button>
      )}
    </VideoWrapper>
  );
};
