import React, { useEffect, useState } from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  StaticImage,
} from "gatsby-plugin-image";
import styled from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const Container = styled.div`
  margin-top: 2vw;
  display: flex;
  justify-content: center;
  /* padding: 3vw 0 0; */
  /* position: relative; */
`;
const Paintings1 = styled(motion.div)`
  --column-gutter: 24px;
  --columns: 2;
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* grid-gap: 1vw; */
  /* width: 960px; */
  width: 90%;
  /* margin: 0 auto; */
  display: grid;
  grid-column-gap: var(--column-gutter);
  align-items: start;
  /* grid-template-rows: auto; */
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  box-sizing: border-box;
  /* position: relative; */
`;
const Paintings = styled(motion.div)`
  box-sizing: border-box;
  width: 70%;
`;

const PaintingContainer = styled(motion.div)`
  position: relative;
  /* height: 30vw; */
`;

const Painting1 = styled(motion.div)`
  /* display: block; */
  /* float: left; */
  /* position: relative; */
  cursor: zoom-in;
  /* width: 35vw; */
  padding: 1vw;
  /* height: 20vw; */
  /* width: 100%; */
  /* position: absolute; */
  /* height: 100%; */
  img {
    /* width: 100%; */
    /* position: absolute; */
    /* height: 100%; */
  }
`;

const Painting = styled(motion.div)`
  border: 1px solid green;
  margin: 0.5vw;
  display: block;
  float: left;
  position: relative;
  cursor: pointer;
  height: 22vw;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s;
  }
  div {
    height: 100%;
  }
  img {
    /* margin: 1vw; */
    height: 100%;

    /* width: 50%; */
    /* position: absolute; */
  }
`;

const Overlay = styled(motion.div)`
  /* background-color: rgba(245, 245, 245, 0.7); */
  background-color: rgb(25, 25, 25, 0.9);
  /* height: 100%; */
  width: 100%;
  /* position: absolute; */
  position: fixed;
  z-index: 1;
  opacity: 0;
  padding: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  //preventing text/element selection with cursor drag
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const SlideContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
`;
const Slide = styled(motion.div)`
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  /* margin: 0 auto; */
  /* width: 50%; */
  /* height: 25%; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled(motion.div)`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const Prev = styled(motion.div)`
  padding: 2vw;
  color: grey;
  font-size: 2vw;
  z-index: 10;
  /* bottom: 0; */
  left: 0;
  position: absolute;
  cursor: pointer;
`;
const Next = styled(motion.div)`
  position: absolute;
  padding: 2vw;
  /* bottom: 0; */
  right: 0;
  color: grey;
  font-weight: 100;
  font-size: 2vw;
  z-index: 10;
  cursor: pointer;
`;

interface IPortfolio {
  readonly id: string;
  readonly name: string | null;
  readonly painting: {
    readonly title: string | null;
    readonly gatsbyImageData: IGatsbyImageData | null;
  } | null;
}

const imageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: "tween", duration: 0.5 } },
  exit: {
    opacity: 0,
    transition: { type: "tween", duration: 0.5 },
  },
};

export default function IndexPage({ data }: PageProps<Queries.PortfolioQuery>) {
  console.log(data.allContentfulPortfolio.nodes);

  const [allPortpolios, setAllPortpolios] = useState<IPortfolio[]>();
  const [index, setIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [imageSrc, setImageSrc] = useState<object>();
  const [back, setBack] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const array = [...data.allContentfulPortfolio.nodes];
    console.log("array", array);
    setAllPortpolios(array);
  }, []);

  const prevClicking = () => {
    console.log(allPortpolios!.length);
    if (index === 0) setIndex(allPortpolios!.length);
    setIndex((prev) => prev - 1);
  };
  const nextClicking = () => {
    if (index === allPortpolios!.length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      {clicked ? (
        <Overlay
          animate={{ opacity: clicked ? 1 : 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          onTap={() => console.log("onClicked!!!!")}
          onClick={() => {
            console.log("onClicked!!!!");
            setClicked(false);
            console.log("allPortpolios", allPortpolios);
          }}
        >
          {/* <Slide style={{ top: scrollY.get() + 100 }}> */}
          <Slide style={{ top: 100 }}>
            <Prev
              onDragStart={(event) => event.preventDefault()}
              onDragOver={(event) => event.preventDefault()}
              onDrag={(event) => event.preventDefault()}
              onClick={(event) => {
                prevClicking();
                console.log("PrevButton!!!!");
                event.stopPropagation();

                console.log("allPortpolios", allPortpolios);
              }}
            >
              <b>&#10094;</b>
            </Prev>
            <AnimatePresence mode="wait" initial={false} custom={back}>
              <Image
                key={index}
                custom={back}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // transition={{ type: "tween", duration: 1 }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                {/* <GatsbyImage image={getImage(imageSrc!)!} alt="image" />
                 */}
                <GatsbyImage
                  image={
                    getImage(allPortpolios![index].painting!.gatsbyImageData!)!
                  }
                  alt={allPortpolios![index].painting?.title!}
                />
              </Image>
            </AnimatePresence>
            <Next
              onClick={(event) => {
                nextClicking();
                event.stopPropagation();
                console.log("allPortpolios", allPortpolios);
              }}
            >
              <b>&#10095;</b>
            </Next>
          </Slide>
        </Overlay>
      ) : null}
      <Layout title="Home">
        <Container>
          <Paintings>
            {/* {data.allContentfulPortfolio.nodes.map((portfolio) => ( */}
            {allPortpolios?.map((portfolio) => (
              <Painting
                key={portfolio.id}
                onClick={() => {
                  setClicked(true);
                  setImageSrc(portfolio.painting?.gatsbyImageData!);
                  setIndex(allPortpolios.indexOf(portfolio));
                  console.log(allPortpolios.indexOf(portfolio));
                }}
              >
                {/* <Link to={`/paintings/${portfolio.id}`}> */}
                <GatsbyImage
                  image={getImage(portfolio.painting!.gatsbyImageData!)!}
                  alt={portfolio.painting!.title!}
                />
                {/* <h2>{portfolio.name}</h2> */}
                {/* </Link> */}
              </Painting>
            ))}
          </Paintings>
        </Container>
      </Layout>
    </>
  );
}

export const query = graphql`
  query Portfolio {
    allContentfulPortfolio(sort: { createdAt: DESC }) {
      nodes {
        id
        name
        painting {
          title
          gatsbyImageData(placeholder: BLURRED, height: 700)
        }
      }
    }
  }
`;

export const Head = () => <Seo title="Home" />;
