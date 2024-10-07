import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { motion } from "framer-motion";
import styled from "styled-components";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  -webkit-touch-callout: text;
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;
const Container = styled(motion.div)`
  width: 80%;
  display: flex;
  justify-content: space-around;

  /* flex-direction: column; */
`;
const Text = styled(motion.div)`
  color: whitesmoke;
  font-weight: 300;
  font-size: 1vw;
  padding: 3vw;
  width: 50%;
`;
const Image = styled(motion.div)``;

export default function About({ data }: PageProps<Queries.myImageQuery>) {
  console.log(data);

  return (
    <Layout title="About">
      <Wrapper>
        <Container>
          <Image>
            <GatsbyImage
              image={
                getImage(data.contentfulPortfolio?.painting?.gatsbyImageData!)!
              }
              alt={data.contentfulPortfolio?.name!}
            />
          </Image>
          <Text>
            Hi, I'm Eunsong Kim. <br />I am an illustrator based in South Korea.
            I play with my inspiration came from the lovely pieces of life like
            sunny with a nice breeze days and shadows of the mind like spooky
            rainy days. <br />I am also interested in programm developing. I
            built this portfolio website by Typescript and other data management
            application. <br />
            It brings me joy to meet with you and I am eager to collaborate with
            you.
            <br />
            <br />
            <div>Email me here, libah8@naver.com</div>
          </Text>
        </Container>
      </Wrapper>
    </Layout>
  );
}

export const Head = () => <Seo title="About" />;

export const query = graphql`
  query myImage {
    contentfulPortfolio(name: { eq: "해바라기" }) {
      name
      painting {
        gatsbyImageData(placeholder: BLURRED, height: 500)
      }
    }
  }
`;
