import { PropsWithChildren } from "react";
import styled from "styled-components";

export type FrameProps = {
  onClickHome?: () => void;
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 375px;
  height: 720px;
  margin: 0 auto;
  border: 2px solid lightgray;
  border-radius: 16px;
  padding: 16px;
  background-color: #6d6f73;
`;

const Display = styled.div`
  overflow: hidden;
  position: relative;
  height: 90%;
  align-self: stretch;
  background-color: white;
  border-radius: 8px;
`;

const HomeButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  appearance: none;
  border: none;
`;

const Countdown = styled.div`
  position: absolute;
  right: 10px;
  bottom: 150px;
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
`;

export const Frame = (props: PropsWithChildren<FrameProps>) => {
  return (
    <Container>
      <Display>
        {props.children}
        <Countdown>{}</Countdown>
      </Display>
      <HomeButton onClick={props.onClickHome} />
    </Container>
  );
};
