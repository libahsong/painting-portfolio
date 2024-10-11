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
  /* margin: 0 auto; */

  /* padding: 3vw 0 0; */
  /* position: relative; */
`;
const Paintings1 = styled(motion.div)`
  --column-gutter: 1vw;
  --columns: 2;
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* grid-gap: 1vw; */
  /* width: 960px; */
  width: 90%;
  /* margin: 0 auto; */
  display: grid;
  /* grid-column-gap: var(--column-gutter); */
  /* align-items: start; */
  /* grid-template-rows: auto; */
  /* grid-template-columns: repeat(var(--columns), minmax(0, 1fr)); */
  /* grid-template-columns: 1fr 1fr; */
  grid-column: 1 / 2;
  grid-row: 3;
  /* box-sizing: border-box; */
  /* position: relative; */
`;

const PWrapper = styled.div`
  padding: 0;
  width: 70%;
  display: flex;
  justify-content: center;
`;
const Paintings = styled(motion.div)`
  padding: 0;
  /* width: 70%; */
  /* width: 97%; */
  /* column-count: 3; */
  display: grid;
  grid-template-columns: repeat(3, calc(98% / 3));
  grid-gap: 1%;
  /* grid-template-columns: calc(100% / 3); */
`;

const PaintingContainer = styled(motion.div)`
  position: relative;
  /* height: 30vw; */
`;

const Column = styled(motion.div)``;

const Painting = styled(motion.div)`
  cursor: pointer;
  margin-bottom: 1vw;
  /* grid-template-columns: calc(100% / 3); */
`;

const Painting1 = styled(motion.div)`
  border: 1px solid green;
  margin-bottom: 1vw;
  /* display: inline-block; */
  /* float: left; */
  /* position: relative; */
  /* position: absolute; */
  box-sizing: border-box;
  cursor: pointer;
  /* height: 22vw; */
  width: calc(100% / 2.5);
  /* margin: 2% */
  /* width: 25vw; */
  &:hover {
    transform: scale(1.03);
    transition: 0.5s;
  }
  &:last-child {
  }
  div {
    /* height: 100%; */
    width: 100%;
  }
  img {
    /* margin: 1vw; */
    /* height: 100%; */
    /* width: 100%; */

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
  const [sortedPortpolios, setSortedPortpolios] = useState<IPortfolio[][]>();
  const [index, setIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [imageSrc, setImageSrc] = useState<object>();
  const [back, setBack] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const array = [...data.allContentfulPortfolio.nodes];
    // const array: any = [1, 2];
    let sortedArray: IPortfolio[][] = [[], [], []];
    const GRID = 3;
    let i = 0;
    const quo = Math.floor(array.length / GRID);
    const remainder = Math.floor(array.length % GRID);
    // console.log("quo", quo, array.length, "remainder", remainder);

    let k = 0;
    do {
      if (array.length === 0) return;
      sortedArray[k] = [...sortedArray[k], array[i]];
      k = k + 1;
      i = i + 1;
      if (k === GRID) k = 0;
      // if (i === LENGTH) {
      //   console.log("LENGTH FINISH!!");
      //   if (remainder === 1) {
      //     sortedArray[0] = [...sortedArray[0], array[array.length - 1]];
      //   } else if (remainder === 2) {
      //     sortedArray[0] = [...sortedArray[0], array[array.length - 2]];
      //     sortedArray[1] = [...sortedArray[1], array[array.length - 1]];
      //   }
      // }
    } while (i < array.length);

    // console.log(sortedArray);
    setAllPortpolios(array);
    setSortedPortpolios(sortedArray);
    // console.log("array", array);
    // console.log("last", array[array.length - 1]);
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
          <PWrapper>
            <Paintings>
              {sortedPortpolios?.map(
                (portfolio, i) => (
                  <Column>
                    {portfolio.map((image, k) => (
                      <Painting
                        onClick={() => {
                          setClicked(true);
                          setImageSrc(image.painting?.gatsbyImageData!);
                          setIndex(allPortpolios!.indexOf(image));
                        }}
                      >
                        <GatsbyImage
                          image={getImage(image.painting?.gatsbyImageData!)!}
                          alt={image.name!}
                        />
                      </Painting>
                    ))}
                  </Column>
                )
                // portfolio.map((image, k) => (
                //   <Painting key={k}>
                //     <div>{k}</div>
                //     <GatsbyImage
                //       image={getImage(image.painting?.gatsbyImageData!)!}
                //       alt={image.name!}
                //     />
                //   </Painting>
                // ))
              )}
            </Paintings>
          </PWrapper>
          {/* <Paintings>
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
                <GatsbyImage
                  image={getImage(portfolio.painting!.gatsbyImageData!)!}
                  alt={portfolio.painting!.title!}
                />
              </Painting>
            ))}
          </Paintings> */}
        </Container>
      </Layout>
    </>
  );
}

export const query = graphql`
  query Portfolio {
    allContentfulPortfolio(sort: { createdAt: ASC }) {
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
