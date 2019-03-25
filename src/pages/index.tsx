import * as React from "react";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";
import { Layout } from "src/components/Layout";
import prop from "ramda/src/prop";

export interface Props {
  data: {
    img: any;
  };
}

const IndexPage: React.SFC<Props> = props => {
  console.log(props.data);
  return (
    <Layout>
      <div style={{ width: "100%", height: "100%" }}>
        {prop("name", { name: "Test" })}
        <GatsbyImage fluid={props.data.img.childImageSharp.fluid} />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    img: file(relativePath: { eq: "solar-panels.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
