import { forwardRef } from "react";
import styled from "styled-components";
import { ChatItem, ChatItemProps } from "~/components/ChatItem";

export type ChatContainerProps = {
  items: ChatItemProps[];
};

const Container = styled.div`
  overflow-y: scroll;
  height: 100%;
  background-image: url("/bg.jpeg");
  background-size: cover;
`;

const Chat = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  list-style: none;
`;

export const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  (props, ref) => {
    return (
      <Container ref={ref}>
        <Chat>
          {props.items.map((item) => {
            return (
              <Li key={`item-${item.id}`}>
                <ChatItem {...item} />
              </Li>
            );
          })}
        </Chat>
      </Container>
    );
  }
);

ChatContainer.displayName = "ChatContainer";
