import styled from "styled-components";

export type ChatItemProps = {
  id: string;
  text: string;
  index: number;
};

const Row = styled.div`
  padding: 10px 0;
`;

const Container = styled.div`
  max-width: 60%;
  width: fit-content;
  padding: 8px;
  background-color: #fff;
`;

const Index = styled.p`
  font-size: 12px;
  margin: 0;
`;

const Item = styled.div`
  font-size: 14px;
  padding: 4px 8px;
  overflow-wrap: break-word;
`;

export const ChatItem = (props: ChatItemProps) => {
  return (
    <Row>
      <Container>
        <Index>{props.index}</Index>
        <Item>{props.text}</Item>
      </Container>
    </Row>
  );
};
