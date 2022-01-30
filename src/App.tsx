import styled from "styled-components";
import { Camera } from "./components/Camera";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const App = () => {
  return (
    <Wrapper>
      <Camera />
    </Wrapper>
  );
};
