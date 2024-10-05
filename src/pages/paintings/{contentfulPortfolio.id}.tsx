import { graphql, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../../components/Layout";

export default function PaintingDetail({
  data,
}: PageProps<Queries.PortfolioDetailQuery>) {
  console.log(data);
  const image = getImage(data.contentfulPortfolio?.painting?.gatsbyImageData!);

  return (
    <Layout title={data.contentfulPortfolio?.name!}>
      <GatsbyImage image={image!} alt={data.contentfulPortfolio?.name!} />
      <h3>{data.contentfulPortfolio?.name}</h3>
    </Layout>
  );
}

export const query = graphql`
  query PortfolioDetail($id: String!) {
    contentfulPortfolio(id: { eq: $id }) {
      name
      painting {
        title
        gatsbyImageData(height: 250, placeholder: BLURRED)
      }
    }
  }
`;
