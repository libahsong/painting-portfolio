import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Layout from "../../components/Layout";

export default function Blog({ data }: PageProps<Queries.BlogPostsQuery>) {
  console.log(data);
  return (
    <Layout title="Blog">
      <section>
        {data.allMdx.nodes.map((file, index) => (
          <article key={index}>
            <Link to={`/blog/${file.frontmatter?.slug}`}>
              <h3>{file.frontmatter?.title}</h3>
              <h5>
                {file.frontmatter?.author} in: {file.frontmatter?.category}
              </h5>
              <h6>{file.frontmatter?.date}</h6>
              <hr />
              <p>{file.excerpt}</p>
            </Link>
          </article>
        ))}
      </section>
    </Layout>
  );
}

export const query = graphql`
  query BlogPosts {
    allMdx {
      nodes {
        frontmatter {
          slug
          author
          category
          date(formatString: "YYYY.MM.DD")
          title
        }
        excerpt(pruneLength: 50)
      }
    }
  }
`;
