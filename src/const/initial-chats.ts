import { ChatItemProps } from "~/components/ChatItem";

export const initialChats: ChatItemProps[] = [...Array(5)]
  .map((_, i) => i)
  .map((i) => {
    return {
      id: Math.random().toString(32).substring(2),
      text: [...Array(i + 1)].map((_, i) => `B${i + 1}`).join(", "),
      index: -1,
    };
  });

export const generateInitialChats = (length: number): ChatItemProps[] => {
  return [...Array(length)]
    .map((_, i) => i)
    .map((i) => {
      return {
        id: Math.random().toString(32).substring(2),
        text: `time=initial, ${i}`,
        index: -1,
      };
    });
};
