import React from "react";
import Routes from "./routes";
import Header from "./components/Header/Header";
import { Container } from "reactstrap";

function App() {
  return (
    <>
      <Header />
      <Container fluid>
        <Routes />
      </Container>
    </>
  );
}

export default App;
