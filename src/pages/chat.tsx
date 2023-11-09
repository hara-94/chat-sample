import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import { Frame } from "~/components/Frame";
import { Button } from "~/components/Button";
import { VStack } from "~/components/VStack";
import { HStack } from "~/components/HStack";
import { NaturalChatContainer } from "~/components/Chat/Natural/Container";
import { NaturalChatItemProps } from "~/components/Chat/Natural/Item";
import { NaturalChatItem } from "~/components/Chat/Natural/Item";

const generateRandomString = (charCount = 7): string => {
  const str = Math.random().toString(36).substring(2).slice(-charCount);
  return str.length < charCount
    ? str + "a".repeat(charCount - str.length)
    : str;
};

const generateChats = (
  initialIndex: number = 0,
  count: number
): NaturalChatItemProps[] => {
  return [...Array(count)]
    .map((_, i) => i)
    .map((index) => {
      return {
        key: generateRandomString(),
        index: initialIndex + index,
        profileUrl: "https://placehold.jp/150x150.png",
        // message: [...Array(index + 1)].map((_, i) => i).join(", "),
        message: (initialIndex + index).toString(),
        imgUrl:
          index % 50 === 0 ? "https://placehold.jp/550x350.png" : undefined,
      };
    });
};

const ControlAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 140px;
  padding: 4px;
  border: 1px solid lightgray;
  border-radius: 4px;
`;

const InputButton = styled.button`
  padding: 4px 8px;
  font-size: 14px;
  border: none;
`;

const START_COUNT = 100;

const PageNatural = () => {
  const [index, setIndex] = useState(0);
  const [chats, setChats] = useState(generateChats(index, START_COUNT));
  const [userInitialChatsCount, setUserInitialChatsCount] =
    useState(START_COUNT);

  const ref = useRef<HTMLDivElement>(null);
  const scrollHeightRef = useRef<number>(ref.current?.scrollHeight ?? 0);
  const isAdjustPositionRef = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    if (isAdjustPositionRef.current) return;

    const div = ref.current;

    // const isNearTop = (div?.scrollTop ?? -1) < 100;
    const isNearTop = (div?.scrollTop ?? -1) === 0;

    if (isNearTop) {
      const newIndex = index + 100;
      setChats((prev) => [
        ...prev,
        ...generateChats(newIndex + (START_COUNT - 100), 100),
      ]);
      setIndex(newIndex);
    }
  }, [index]);

  useEffect(() => {
    const div = ref.current;
    div?.addEventListener("scroll", handleScroll);

    return () => {
      div?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    scrollHeightRef.current = ref.current.scrollHeight;

    const observer = new MutationObserver(() => {
      isAdjustPositionRef.current = true;
      const positionY =
        (ref.current?.scrollHeight ?? 0) - scrollHeightRef.current;
      ref.current?.scrollTo({
        top: positionY,
        behavior: "instant",
      });
      scrollHeightRef.current = ref.current?.scrollHeight ?? 0;
      isAdjustPositionRef.current = false;
    });

    observer.observe(ref.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: "instant",
    });
  }, []);

  return (
    <Frame
      ref={ref}
      controlArea={
        <ControlAreaContainer>
          <VStack>
            <HStack>
              <Button
                onClick={() => {
                  ref.current?.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                toTop
              </Button>
              <Button
                onClick={() => {
                  ref.current?.scrollTo({
                    top: ref.current?.scrollHeight,
                    behavior: "smooth",
                  });
                }}
              >
                toBottom
              </Button>
              <p>メッセージ: {chats.length}件</p>
            </HStack>
            {/* <HStack style={{ alignItems: "center" }}>
              <VStack style={{ gap: "4px" }}>
                <p style={{ fontSize: "12px" }}>初期メッセージ数</p>
                <Input
                  value={userInitialChatsCount}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (Number.isNaN(value)) {
                      alert("数字を入力してください");
                      return;
                    }
                    setUserInitialChatsCount(value);
                  }}
                  placeholder="初期メッセージ数"
                />
              </VStack>
              <InputButton
                onClick={() => {
                  const count = Number(userInitialChatsCount);
                  if (Number.isNaN(count)) {
                    alert("数字を入力してください");
                    return;
                  }
                  if (count < 0) {
                    alert("0以上の数字を入力してください");
                    return;
                  }
                  ref.current?.scrollTo({
                    top: ref.current?.scrollHeight,
                    behavior: "instant",
                  });
                  // setIndex(0);
                  // setChats(generateChats(0, count));
                  setCallHandleScroll(false);
                  setChats([]);
                  setCallHandleScroll(true);
                }}
              >
                初期化
              </InputButton>
            </HStack> */}
          </VStack>
        </ControlAreaContainer>
      }
    >
      <NaturalChatContainer>
        {chats.map((chat) => {
          return <NaturalChatItem {...chat} key={chat.key} />;
        })}
      </NaturalChatContainer>
    </Frame>
  );
};

export default PageNatural;
