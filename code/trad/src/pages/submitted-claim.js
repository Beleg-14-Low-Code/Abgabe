import { Card, Form, Row } from "react-bootstrap";
import React from "react";
import claim from "../pages/claim.svg";

const SubmittedClaim = () => {
  return (
    <>
      <div className="App">
        <p>Thank you for getting in touch.</p>
        <h2>Your claim has been succesfully submitted.</h2>
      </div>

      <Card className="mb-3" style={{ width: "45vw" }}>
        <Card.Body>
          <Form.Group className="mb-3" controlId="policy">
            <Row xs={5}>
              <Card.Img
                src={claim}
                alt="Car image"
                className="mx-auto d-block "
                width="200"
                height="200"
              />
            </Row>
            <p class="fs-6 text-center">Your claim reference</p>
            <p class="fs-5 fw-bold text-center">CVE000411</p>
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
};

export { SubmittedClaim };
