import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Frame } from "~/components/Frame";
import { ChatContainer } from "~/components/ChatContainer";
import { ChatItemProps } from "~/components/ChatItem";
import { Button } from "~/components/Button";
import { initialChats } from "~/const/initial-chats";

const ButtonContainer = styled.div`
  width: fit-content;
  margin: 10px auto 0;
  display: flex;
  gap: 4px;
`;

export default function Home() {
  const [chats, setChats] = useState(initialChats);
  const [shouldAddChats, setShouldAddChats] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(3);

  const addChatItem = () => {
    const additionalChats: ChatItemProps[] = [...Array(20)]
      .map((_, i) => i)
      .map((i) => {
        return {
          id: Math.random().toString(32).substring(2),
          text: [...Array(i + 1)].map((_, i) => `B${i + 1}`).join(", "),
        };
      });

    const newChats = [...additionalChats, ...chats];
    setChats(newChats);
  };

  const countdownMessage =
    countdown > 0
      ? `${countdown}秒後に追加します`
      : "新しくmessageを読み込みました";

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, []);

  useEffect(() => {
    let id: NodeJS.Timer | null = null;
    if (shouldAddChats) {
      setTimeout(() => {
        setChats((prev) => [
          ...[...Array(20)]
            .map((_, i) => i)
            .map((i) => {
              return {
                id: Math.random().toString(32).substring(2),
                text: [...Array(i + 1)].map((_, i) => `B${i + 1}`).join(", "),
              };
            }),
          ...prev,
        ]);
      }, 3000);

      id = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (id) {
        return clearInterval(id);
      }
    };
  }, [shouldAddChats]);

  return (
    <>
      <Frame>
        <ChatContainer ref={ref} items={chats} />
      </Frame>
      <ButtonContainer>
        <Button onClick={() => console.log(ref.current?.scrollTop)}>
          scrollTop
        </Button>
        <Button onClick={() => console.log(ref.current?.scrollHeight)}>
          scrollHeight
        </Button>
        <Button onClick={() => console.log(ref.current?.clientHeight)}>
          height
        </Button>
      </ButtonContainer>
    </>
  );
}
