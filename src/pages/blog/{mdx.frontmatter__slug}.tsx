import React from "react";
import Layout from "../../components/Layout";
import { graphql } from "gatsby";
import Seo from "../../components/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface IBlogPostProps {
  data: Queries.PostDetailQuery;
  children: any;
}

export default function BlogPost({ data, children }: IBlogPostProps) {
  console.log(data);

  return (
    <Layout title="Blog Post">
      <div>{children}</div>
    </Layout>
  );
}

export const query = graphql`
  query PostDetail($frontmatter__slug: String) {
    mdx(frontmatter: { slug: { eq: $frontmatter__slug } }) {
      body
      frontmatter {
        author
        category
        date
        title
        slug
      }
    }
  }
`;

export const Head = ({ data }: IBlogPostProps) => (
  <Seo title={data.mdx?.frontmatter?.title ?? ""} />
);
