import { forwardRef } from "react";
import styled from "styled-components";

export type FrameProps = {
  children?: React.ReactNode;
  controlArea?: React.ReactNode;
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Display = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: scroll;
  /* background-image: url("/bg.jpeg");
  background-size: cover; */
  background-color: black;
`;

const ControlArea = styled.div`
  width: 100%;
  height: 100px;
`;

export const Frame = forwardRef<HTMLDivElement, FrameProps>((props, ref) => {
  const { children, controlArea } = props;

  return (
    <Container>
      <Display ref={ref}>{children}</Display>
      <ControlArea>{controlArea}</ControlArea>
    </Container>
  );
});

Frame.displayName = "Frame";
