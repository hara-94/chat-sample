import { PropsWithChildren, forwardRef } from "react";
import styled from "styled-components";

export type NaturalChatContainerProps = {};

const Display = styled.div``;

const List = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  /* flex-direction: column; */
  justify-content: flex-start;
  gap: 16px;
`;

export const NaturalChatContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<NaturalChatContainerProps>
>((props, ref) => {
  return <List>{props.children}</List>;
});

NaturalChatContainer.displayName = "NaturalChatContainer";
