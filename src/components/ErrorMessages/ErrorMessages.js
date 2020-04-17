import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const ErrorMessages = ({ error }) => {
  return (
    <>
      <ListGroup>
        {error.map((error, index) => (
          <ListGroupItem key={index}>{error}</ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default ErrorMessages;
