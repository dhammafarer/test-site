import React, { useRef, useEffect } from "react";
import { Box } from "primithemes";
import { useIntersect } from "src/hooks/useIntersect";

const Container: React.SFC<{}> = ({ children }) => {
  const ref = useRef() as React.Ref<HTMLDivElement>;

  const [setNode, entry] = useIntersect({ threshold: 0.8 });

  useEffect(() => {
    setNode(ref.current);
  }, []);

  useEffect(() => {
    if (entry.isIntersecting) setNode(null);
  }, [entry]);

  return (
    <div
      style={{
        transition: "400ms ease-out",
        opacity: entry.isIntersecting ? 1 : 0,
        transform: `translateY(${entry.isIntersecting ? "0px" : "-10px"})`,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

const IndexPage: React.SFC<{}> = props => {
  return (
    <div>
      <div>
        <Box bg="primary.light" style={{ height: "100vh" }} />
      </div>
      <div style={{ overflow: "hidden" }}>
        {Array(5)
          .fill("")
          .map((x, i) => (
            <Container key={i}>
              <Box
                bg="primary.main"
                style={{
                  height: "20vh",
                }}
              />
            </Container>
          ))}
      </div>
    </div>
  );
};

export default IndexPage;
