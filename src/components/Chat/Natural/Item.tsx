import styled from "styled-components";

export type NaturalChatItemProps = {
  key: string;
  index: number;
  profileUrl?: string;
  message: string;
  imgUrl?: string;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const Profile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Item = styled.div`
  min-width: 100px;
  max-width: 65%;
  width: fit-content;
  background-color: white;
  border-radius: 8px;
  padding: 4px;
`;

const Message = styled.p`
  font-size: 12px;
  margin: 0;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;

export const NaturalChatItem = (props: NaturalChatItemProps) => {
  const { message, index, profileUrl } = props;

  return (
    <Container>
      <Profile src={profileUrl ?? "/default_profile.png"} />
      <Item>
        {props.imgUrl ? (
          <Image src={props.imgUrl} alt="画像" />
        ) : (
          <Message>
            index: {index}
            <br />
            <br />
            {message}
          </Message>
        )}
      </Item>
    </Container>
  );
};
