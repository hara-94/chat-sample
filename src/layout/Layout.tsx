import { ReactNode } from "react";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: #eee;
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 100px;
  height: auto;
`;

const Footer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #eee;
`;

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header>
        <HeaderLogo src="https://placehold.jp/700x200.png" alt="logo" />
      </Header>
      {children}
      <Footer></Footer>
    </>
  );
};
