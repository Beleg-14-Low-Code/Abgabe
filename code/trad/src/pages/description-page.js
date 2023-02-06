import { Card, Form } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  accidentState: PropTypes.string,
  setAccidentState: PropTypes.func,
};

const DescriptionPage = (props) => {
  const { accidentState, setAccidentState } = props;

  return (
    <>
      <div className="App">
        <p>Finally tell us about what happened</p>
        <h2>Please describe what happened in as much details as possible.</h2>
      </div>

      <Form>
        <Card className="mb-3" style={{ width: "45vw" }}>
          <Card.Body>
            <Form.Group className="mb-3" controlId="policy">
              <Form.Label className="fs-6">
                Description of the incident you're claiming for
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={accidentState.description}
                onChange={(e) =>
                  setAccidentState({
                    ...accidentState,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};

export { DescriptionPage };
DescriptionPage.propTypes = propTypes;
