import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { faceDetector } from "../model";
import { ErrorText } from "./ErrorText";
import { Photo } from "./Photo";
import { Video } from "./Video";

const CameraWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [error, setError] = useState(false);

  const getVideo = async () => {
    try {
      setLoadingVideo(true);
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: { width: 1920, height: 1080 },
      });
      const video = videoRef.current;
      if (!video) {
        return;
      }
      video.srcObject = stream;
      video.play();
      setLoadingVideo(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPhoto = async () => {
    setLoadingPhoto(true);
    const width = 414;
    const height = width / (16 / 9);
    const video = videoRef.current;
    const photo = photoRef.current;

    if (!photo || !video) {
      return;
    }

    photo.width = width;
    photo.height = height;
    const ctx = photo?.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.drawImage(video, 0, 0, width, height);
    const { faceRectangles, facesLandmarks, error } = await faceDetector(photo);
    if (error) {
      setError(true);
      setHasPhoto(false);
      setLoadingPhoto(false);
      return;
    }
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    faceRectangles.forEach((face) => {
      ctx.fillRect(...face);
    });
    ctx.fillStyle = "red";
    const landmarkSize = 2;
    facesLandmarks.forEach(([x, y]) => {
      ctx.fillRect(x, y, landmarkSize, landmarkSize);
    });
    setHasPhoto(true);
    setLoadingPhoto(false);
  };

  const clearPhoto = () => {
    const photo = photoRef.current;
    if (!photo) {
      return;
    }
    const ctx = photo.getContext("2d");
    ctx?.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <CameraWrapper>
      <Video
        loading={loadingVideo}
        videoRef={videoRef}
        getPhoto={getPhoto}
        loadingPhoto={loadingPhoto}
      />
      <Photo hasPhoto={hasPhoto} photoRef={photoRef} clearPhoto={clearPhoto} />
      {error && (
        <ErrorText setError={setError}>
          {"Unexpected Error occured... Please try again."}
        </ErrorText>
      )}
    </CameraWrapper>
  );
};
