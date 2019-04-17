import * as React from "react";
import styled from "styled-components";
import { color, space } from "src/theme";
import {
  canon,
  trafalgar,
  paragon,
  doublePica,
  greatPrimer,
  bodyCopy,
  pica,
  longPrimer,
  brevier,
  minion,
} from "src/theme/typography";

import Faker from "faker";

const Container = styled.div`
  padding: ${space(3)};
  background: ${color("grey.100")};
`;

const Canon = styled.h1`
  ${canon}
  color: ${color("primary.main")};
  font-weight: 400;
`;

const Trafalgar = styled.h1`
  ${trafalgar}
`;

const Paragon = styled.h1`
  ${paragon}
`;

const DoublePica = styled.h1`
  ${doublePica}
`;

const GreatPrimer = styled.h1`
  ${greatPrimer}
`;

const BodyCopy = styled.h1`
  ${bodyCopy}
`;

const Pica = styled.h1`
  ${pica}
`;

const LongPrimer = styled.h1`
  ${longPrimer}
`;

const Brevier = styled.p`
  ${brevier}
  color: ${color("text.main")};
  font-weight: 700;
`;

const Minion = styled.p`
  ${minion}
  color: ${color("text.main")};
`;

const Typography: React.SFC<{}> = props => {
  return (
    <div>
      <Container>
        <Canon>{Faker.lorem.sentence()}</Canon>
        <Trafalgar>{Faker.lorem.sentence()}</Trafalgar>
        <Paragon>{Faker.lorem.sentences()}</Paragon>
        <DoublePica>{Faker.lorem.sentences()}</DoublePica>
        <GreatPrimer>{Faker.lorem.sentences()}</GreatPrimer>
        <BodyCopy>{Faker.lorem.paragraph()}</BodyCopy>
        <Pica>{Faker.lorem.sentences()}</Pica>
        <LongPrimer>{Faker.lorem.sentences()}</LongPrimer>
        <Brevier>{Faker.lorem.sentences()}</Brevier>
        <Minion>{Faker.lorem.sentences()}</Minion>
      </Container>
    </div>
  );
};

export default Typography;
