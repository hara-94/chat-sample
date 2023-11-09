import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import { Button } from "~/components/Button";
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

const Container = styled.div`
  height: calc(100dvh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageNatural = () => {
  const [triggerReRender, setTriggerReRender] = useState(false);
  const [index, setIndex] = useState(0);
  const [chats, setChats] = useState(generateChats(index, 1000));

  const ref = useRef<HTMLDivElement>(null);
  const scrollHeightRef = useRef<number>(ref.current?.scrollHeight ?? 0);

  const handleScroll = useCallback(() => {
    const div = ref.current;

    // const isNearTop = (div?.scrollTop ?? -1) < 100;
    const isNearTop = (div?.scrollTop ?? -1) === 0;
    const isNearBottom =
      (div?.scrollHeight ?? 0) -
        (div?.scrollTop ?? -1) -
        (div?.clientHeight ?? -1) <
      100;

    if (isNearTop) {
      const newIndex = index + 100;
      setChats((prev) => [...prev, ...generateChats(newIndex + 900, 100)]);
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
      console.log("ref.current is null");
      return;
    }
    scrollHeightRef.current = ref.current.scrollHeight;

    const observer = new MutationObserver(() => {
      console.log(ref.current?.scrollHeight);
      console.log(scrollHeightRef.current);
      const positionY =
        (ref.current?.scrollHeight ?? 0) - scrollHeightRef.current;
      ref.current?.scrollTo({
        top: positionY,
        behavior: "instant",
      });
      scrollHeightRef.current = ref.current?.scrollHeight ?? 0;
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
    <Container>
      <p>total count: {chats.length}</p>
      <HStack>
        <Button
          onClick={() => {
            ref.current?.scrollTo({
              top: ref.current?.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          scroll to bottom
        </Button>
        <Button
          onClick={() => {
            ref.current?.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          scroll to top
        </Button>
        <Button onClick={() => setTriggerReRender((prev) => !prev)}>
          re-render
        </Button>
      </HStack>

      <NaturalChatContainer ref={ref}>
        {chats.map((item) => (
          <NaturalChatItem {...item} key={item.key} />
        ))}
      </NaturalChatContainer>
    </Container>
  );
};

export default PageNatural;
