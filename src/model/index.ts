import * as blazeface from "@tensorflow-models/blazeface";

let model: blazeface.BlazeFaceModel | undefined;

const loadModel = async () => {
  model = await blazeface.load();
};

export const faceDetector = async (input: HTMLCanvasElement) => {
  let faceRectangles: Array<[number, number, number, number]> = [[0, 0, 0, 0]];
  let facesLandmarks: Array<[number, number]> = [];
  let error;
  try {
    if (!model) {
      await loadModel();
    }
    const returnTensors = false;
    const predictions = await model?.estimateFaces(input, returnTensors);

    if (predictions && predictions.length > 0) {
      predictions.forEach((prediction, i) => {
        const start = prediction.topLeft;
        const end = prediction.bottomRight;
        if (start instanceof Array && end instanceof Array) {
          const size = [end[0] - start[0], end[1] - start[1]];
          faceRectangles[i] = [start[0], start[1], size[0], size[1]];
        }
        if (prediction.landmarks && prediction.landmarks instanceof Array) {
          facesLandmarks.push(...(prediction.landmarks as [number, number][]));
        }
      });
    }
  } catch (e) {
    error = e;
  }

  return { faceRectangles, facesLandmarks, error };
};
