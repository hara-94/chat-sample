import { useState, useRef, ReactNode } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const generateRandomString = () => {
  const random = (Math.random() * 3).toString(36).substring(2, 15);
  return random + random + random;
};

type Message = {
  text: ReactNode;
};

const PageTanstack = () => {
  const [messages, setMessages] = useState<Message[]>(
    [...Array(100)].map((_, i) => {
      if (i % 10 === 0) {
        return {
          text: (
            <div>
              hoge
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              hoge
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              hogehoge
              <br />
              <br />
              hoge
              <br />
              <br />
              <br />
              <br />
              <br />
              hoge
              <br />
              <br />
              <br />
              <br />
              hogehogehoge
              <br />
              <br />
              end
            </div>
          ),
        };
      } else {
        return { text: generateRandomString() };
      }
    })
  );
  const parenRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parenRef.current,
    estimateSize: () => 10,
    overscan: 10,
  });

  const items = rowVirtualizer.getVirtualItems();

  return (
    <div
      style={{
        height: `500px`,
        width: `250px`,
        overflow: "auto",
        margin: "0 auto",
      }}
      ref={parenRef}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const message = messages[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                style={{
                  overflowWrap: "break-word",
                  border: "1px solid black",
                }}
                ref={rowVirtualizer.measureElement}
              >
                {message.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageTanstack;
