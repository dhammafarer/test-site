import * as React from "react";
import styled, { css } from "styled-components";
import { color, space } from "src/theme";
import { tablet, laptop, desktop } from "src/theme/media";
import { trafalgar, doublePica, bodyCopy } from "src/theme/typography";

import Faker from "faker";

const Container = styled.div`
  position: relative;
  background: url(https://www.stockvault.net/data/2017/12/02/240447/preview16.jpg);
  z-index: 0;
  padding: ${space(5)} ${space(3)};
  ${tablet(css`
    padding-left: 10%;
    padding-right: 10%;
  `)}
  ${laptop(css`
    padding-left: 20%;
    padding-right: 20%;
  `)}
  ${desktop(css`
    padding-left: 25%;
    padding-right: 25%;
  `)}
  color: ${color("white.light")};
`;

const Title = styled.h1`
  ${trafalgar}
  font-weight: 700;
  text-shadow: 0px 2px 20px rgba(0, 0, 0, 0.16);
`;

const Subtitle = styled.h3`
  ${doublePica}
  font-weight: 300;
`;

const LeadParagraph = styled.h3`
  ${bodyCopy}
  font-weight: 700;
`;

const Body = styled.p`
  ${bodyCopy}
  margin-bottom: ${space(3)}
`;

const Typography: React.SFC<{}> = props => {
  return (
    <div>
      <Container>
        <Title>{Faker.lorem.sentence()}</Title>
        <Subtitle>{Faker.lorem.sentence()}</Subtitle>
        <LeadParagraph>{Faker.lorem.paragraph()}</LeadParagraph>
        <Body>{Faker.lorem.paragraph()}</Body>
        <Body>{Faker.lorem.paragraph()}</Body>
      </Container>
    </div>
  );
};

export default Typography;
