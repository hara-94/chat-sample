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
  initialIndex: number,
  count: number
): NaturalChatItemProps[] => {
  return [...Array(count)]
    .map((_, i) => i)
    .map((index) => {
      return {
        key: generateRandomString(),
        index: initialIndex + index,
        profileUrl: "https://placehold.jp/150x150.png",
        message: (initialIndex + index).toString(),
        imgUrl:
          initialIndex + (index % 50) === 0
            ? "https://placehold.jp/550x350.png"
            : undefined,
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

const START_COUNT = 1;
const LOAD_COUNT = 10;

const PageNatural = () => {
  const [latestCount, setLatestCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [chats, setChats] = useState(generateChats(index, START_COUNT));
  const [userInitialChatsCount, setUserInitialChatsCount] =
    useState(START_COUNT);
  const [triggerScrollBottom, setTriggerScrollBottom] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const scrollHeightRef = useRef<number>(ref.current?.scrollHeight ?? 0);
  const isTouching = useRef<boolean>(false);
  const scrollY = useRef<number>(0);

  const handleTouchStart = useCallback(() => {
    isTouching.current = true;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isTouching.current = false;
  }, []);

  useEffect(() => {
    const div = ref.current;
    div?.addEventListener("touchstart", handleTouchStart);

    return () => {
      div?.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleTouchStart]);

  useEffect(() => {
    const div = ref.current;
    div?.addEventListener("touchend", handleTouchEnd);

    return () => {
      div?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchEnd]);

  const handleScroll = useCallback(() => {
    console.log(`scroll: ${ref.current?.scrollTop}`);
    if (scrollY.current === 0) {
      scrollY.current = ref.current?.scrollTop ?? 0;
      return;
    }
    scrollY.current = ref.current?.scrollTop ?? 0;

    if (isTouching.current) return;

    const div = ref.current;

    const isNearTop = (div?.scrollTop ?? -1) === 0;

    if (isNearTop) {
      const newIndex = index + LOAD_COUNT;
      setChats((prev) => [
        ...prev,
        ...generateChats(newIndex + (START_COUNT - LOAD_COUNT), LOAD_COUNT),
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
    if (ref.current) {
      scrollHeightRef.current = ref.current.scrollHeight;
    }
  }, []);

  useLayoutEffect(() => {
    console.log(`scrollBottom: ${ref.current?.scrollHeight}`);
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: "auto",
    });
  }, [triggerScrollBottom]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const positionY = ref.current.scrollHeight - scrollHeightRef.current;
    scrollHeightRef.current = ref.current.scrollHeight;
    ref.current.scrollTop = positionY;
  }, [ref.current?.scrollHeight]);

  // useEffect(() => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   scrollHeightRef.current = ref.current.scrollHeight;

  //   const observer = new MutationObserver(() => {
  //     if (!ref.current) return;
  //     isAdjustPositionRef.current = true;
  //     const positionY =
  //       (ref.current?.scrollHeight ?? 0) - scrollHeightRef.current;

  //     scrollHeightRef.current = ref.current?.scrollHeight ?? 0;
  //     ref.current.scrollTop = positionY;

  //     isAdjustPositionRef.current = false;
  //   });

  //   observer.observe(ref.current, {
  //     attributes: true,
  //     childList: true,
  //     subtree: true,
  //   });

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

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
                  console.log(`toBottom: ${ref.current?.scrollHeight}`);
                  ref.current?.scrollTo({
                    top: ref.current?.scrollHeight,
                    behavior: "smooth",
                  });
                }}
              >
                toBottom
              </Button>
              {/* <Button
                onClick={() => {
                  const newIndex = index + 1;
                  setChats((prev) => [
                    ...prev,
                    {
                      key: generateRandomString(),
                      index: newIndex,
                      profileUrl: "https://placehold.jp/150x150.png",
                      message: newIndex.toString(),
                      imgUrl:
                        newIndex % 50 === 0
                          ? "https://placehold.jp/550x350.png"
                          : undefined,
                    },
                  ]);
                  setIndex(newIndex);
                }}
              >
                add single
              </Button> */}
              <Button
                onClick={() => {
                  setChats((prev) => [
                    {
                      key: generateRandomString(),
                      index: latestCount,
                      profileUrl: "https://placehold.jp/150x150.png",
                      message: "latest",
                    },
                    ...prev,
                  ]);
                  setTriggerScrollBottom((prev) => !prev);
                  setLatestCount((prev) => prev + 1);
                }}
              >
                add latest
              </Button>
              {/* <Button onClick={() => console.log(ref.current?.scrollHeight)}>
                log
              </Button> */}
              <p style={{ fontSize: "12px" }}>メッセージ: {chats.length}件</p>
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
                    behavior: "auto",
                  });
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
