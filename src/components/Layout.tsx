import { Link } from "gatsby";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import "./font.css";
import "./style.css";

const Wrapper = styled.div`
  /* height: 100vh; */
  /* height: 200vh; */
  /* height: 100%; */
  /* margin: 0; */
  /* padding: 0; */
  /* position: relative; */
  /* overflow-x: hidden; */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Name = styled.div`
  /* font-family: "Edu AU VIC WA NT Guides", system-ui;*/
  font-family: "Caveat", cursive;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 3vw;
  padding: 0.5vw;
  font-weight: 700;
  color: #1a3f1a;
`;
const Contents = styled.div`
  /* height: 100vh; */
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 300;
`;
const Nav = styled.div`
  width: 70%;
  font-size: 1.7vw;
  font-weight: 250;
  ul {
    border-bottom: 1px solid brown;
    /* border-top: 1px solid black; */
    padding: 0.5vw;
    list-style: none;
    display: flex;
    justify-content: space-around;
    li {
      /* font-family: "Edu AU VIC WA NT Guides", system-ui; */
      font-family: "Caveat", cursive;
      font-optical-sizing: auto;
      font-style: normal;
      a {
        text-decoration: none;
        color: #1b431b;
        /* color: black; */
        &:hover {
          color: lavender;
        }
      }
    }
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5vw;
  font-weight: 300;
`;

interface ILayoutProps {
  children?: any;
  title: string;
}

export default function Layout({ children, title }: ILayoutProps) {
  return (
    <Wrapper>
      <Header>
        <Name>EunSong</Name>
        <Nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About me</Link>
            </li>
            {/* <li>
              <Link to="/contact">Contact</Link>
            </li> */}
            {/* <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
            <Link to="/blog">Blog</Link>
            </li> */}
          </ul>
        </Nav>
      </Header>
      <Contents>{children}</Contents>
      <Footer>
        <div>
          &copy; Eunsong {new Date().getFullYear()}. All rights reserved.
        </div>
      </Footer>
    </Wrapper>
  );
}
