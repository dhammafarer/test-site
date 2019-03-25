import * as React from "react";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";
import { Layout } from "src/components/Layout";
import { prop, identity, map } from "ramda";
import { Box, Flex } from "primithemes";

export interface Props {
  data: {
    img: any;
  };
}

const IndexPage: React.SFC<Props> = props => {
  return (
    <Layout>
      <Flex w={1} flexDirection={["column", "row"]} flexWrap="wrap">
        {map(identity, [1, 2, 3]).map((a: any) => (
          <Box p={3} bg="primary.main" w={1 / 2}>
            {prop("name", { name: a })}
          </Box>
        ))}
      </Flex>
      <GatsbyImage fluid={props.data.img.childImageSharp.fluid} />
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
