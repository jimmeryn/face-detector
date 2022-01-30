import { Dispatch, FC, SetStateAction, useEffect } from "react";
import styled from "styled-components";

const Error = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  max-width: 50vw;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: white;
  padding: 20px;
`;

type Props = {
  setError: Dispatch<SetStateAction<boolean>>;
};

export const ErrorText: FC<Props> = ({ setError, children }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [setError]);

  return <Error>{children}</Error>;
};
