import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1>404 not found, you're lost!</h1>
    </main>
  );
};

export default NotFoundPage;
