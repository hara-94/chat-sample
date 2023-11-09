import { PropsWithChildren, forwardRef } from "react";
import styled from "styled-components";

export type NaturalChatContainerProps = {};

const Display = styled.div`
  width: 300px;
  height: 450px;
  overflow-y: scroll;
  background-image: url("/bg.jpeg");
  background-size: cover;
  padding: 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column-reverse;
  /* flex-direction: column; */
  gap: 16px;
  padding: 0;
  margin: 0;
`;

export const NaturalChatContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<NaturalChatContainerProps>
>((props, ref) => {
  return (
    <Display ref={ref}>
      <List>{props.children}</List>
    </Display>
  );
});

NaturalChatContainer.displayName = "NaturalChatContainer";
