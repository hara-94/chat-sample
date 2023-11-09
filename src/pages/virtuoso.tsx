import { useState, useEffect, useCallback } from "react";
import { Virtuoso, VirtuosoProps } from "react-virtuoso";
import { HStack } from "~/components/HStack";
import { Button } from "~/components/Button";
import { Frame } from "~/components/Frame";
import { ChatItem, ChatItemProps } from "~/components/ChatItem";
import { initialChats, generateInitialChats } from "~/const/initial-chats";

const START_INDEX = 10000;

const PageVirtuoso = () => {
  const [addTimes, setAddTimes] = useState(0);
  const [chatItems, setChatItems] = useState<ChatItemProps[]>(() =>
    generateInitialChats(30)
  );
  const [triggerCountdown, setTriggerCountdown] = useState(false);

  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);

  const addChatItems = useCallback(
    (length: number, isForward: boolean = false) => {
      setChatItems((prev) => [
        ...(isForward ? prev : []),
        ...[...Array(length)]
          .map((_, i) => i)
          .map((i) => {
            return {
              id: Math.random().toString(32).substring(2),
              text: `time=${addTimes}, ${i}`,
              index: -1,
            };
          }),
        ...(isForward ? [] : prev),
      ]);
    },
    [addTimes]
  );

  const startReached = useCallback(
    (index: number) => {
      console.log(index);
      const nextFirstItemIndex = firstItemIndex - 10;
      addChatItems(10);
      setFirstItemIndex(() => nextFirstItemIndex);
    },
    [addChatItems, firstItemIndex]
  );

  useEffect(() => {
    let id: NodeJS.Timer | null = null;
    if (!triggerCountdown) return;

    id = setTimeout(() => {
      addChatItems(10);
      setTriggerCountdown(false);
    }, 3000);

    return () => {
      if (id) clearTimeout(id);
    };
  }, [triggerCountdown, addChatItems]);

  useEffect(() => {
    setAddTimes((prev) => prev + 1);
  }, [chatItems]);

  return (
    <div>
      <Frame>
        <Virtuoso
          style={{
            height: "100%",
            backgroundImage: "url(/bg.jpeg)",
            backgroundSize: "cover",
          }}
          data={chatItems}
          alignToBottom={true}
          // followOutput
          initialTopMostItemIndex={chatItems.length - 1}
          firstItemIndex={firstItemIndex}
          startReached={startReached}
          itemContent={(index, item: ChatItemProps) => {
            return <ChatItem id={item.id} text={item.text} index={index} />;
          }}
        />
      </Frame>
      <HStack style={{ justifyContent: "center", marginTop: "16px" }}>
        <Button
          onClick={() => {
            addChatItems(1);
          }}
        >
          Add first
        </Button>
        <Button
          onClick={() => {
            addChatItems(1, true);
          }}
        >
          Add last
        </Button>
        <Button onClick={() => setTriggerCountdown(true)}>set countdown</Button>
      </HStack>
    </div>
  );
};

export default PageVirtuoso;
