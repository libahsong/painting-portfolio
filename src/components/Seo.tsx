import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface ISeoProps {
  title: string;
}

export default function Seo({ title }: ISeoProps) {
  const data = useStaticQuery<Queries.SeoDataQuery>(graphql`
    query SeoData {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  console.log(data.site?.siteMetadata?.title);

  return <title>{title} | EUNSONG</title>;
}
