import styled from "styled-components";

export const Button = styled.button`
  appearance: none;
  border: none;
  position: absolute;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
  border-radius: 10px;
  padding: 12px 16px;
  background-color: #8bbabb;
  color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: none;

  &:hover {
    background: #6ba7a8;
  }
`;
