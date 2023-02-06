import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Row, Col } from "react-bootstrap";
import "./first-page.css";
import PropTypes from "prop-types";
import { CustomToggleButton } from "./components/custom-toggle-button";

const propTypes = {
  involvedPersonState: PropTypes.any,
  setInvolvedPerson: PropTypes.func,
};

const OtherPartyPage = (props) => {
  const { involvedPersonState, setInvolvedPerson } = props;
  const optionsHow = [
    "",
    "Affected bystander",
    "Driver of another vehicle",
    "Passenger in another vehicle",
    "Passenger in your vehicle",
    "Witness",
  ];
  //TODO add multiple involved Person
  return (
    <>
      <div className="App">
        <p>Enter a fictive name to try the demo</p>
        <h2>Can you tell us who was involved and how to contact them?</h2>
      </div>
      <Card className="mb-3" style={{ width: "45vw" }}>
        <Card.Body>
          <p>Other party</p>
          <Form.Group className="mb-3" controlId="firstAndLastName">
            <Row>
              <Col>
                <Form.Label className="fs-6">First name</Form.Label>
                <Form.Control
                  type="text"
                  value={involvedPersonState.firstName}
                  onChange={(e) =>
                    setInvolvedPerson({
                      ...involvedPersonState,
                      firstName: e.target.value,
                    })
                  }
                />
              </Col>
              <Col>
                <Form.Label className="fs-6">Last name</Form.Label>
                <Form.Control
                  type="text"
                  value={involvedPersonState.lastName}
                  onChange={(e) =>
                    setInvolvedPerson({
                      ...involvedPersonState,
                      lastName: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactInfo">
            <Row>
              <Col>
                <Form.Label className="fs-6">Contact number</Form.Label>
                <Form.Control
                  type="text"
                  value={involvedPersonState.contactNumber}
                  onChange={(e) =>
                    setInvolvedPerson({
                      ...involvedPersonState,
                      contactNumber: e.target.value,
                    })
                  }
                />
              </Col>
              <Col>
                <Form.Label className="fs-6">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={involvedPersonState.email}
                  onChange={(e) =>
                    setInvolvedPerson({
                      ...involvedPersonState,
                      email: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </Form.Group>
          <CustomToggleButton
            id="insurance"
            stateValue={involvedPersonState.hasInsurance}
            setStateValue={setInsurance}
            label="Has insurance"
          />
          {involvedPersonState.hasInsurance === "1" && (
            <>
              <Form.Label className="fs-6">Insurer</Form.Label>
              <Form.Control
                type="text"
                value={involvedPersonState.insurance}
                onChange={(e) =>
                  setInvolvedPerson({
                    ...involvedPersonState,
                    insurance: e.target.value,
                  })
                }
              />
            </>
          )}
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label className="fs-6">How were they involved?</Form.Label>
            <Form.Select
              onChange={(e) =>
                setInvolvedPerson({
                  ...involvedPersonState,
                  howInvolved: e.target.value,
                })
              }>
              {optionsHow.map((option) => {
                return <option value={option}>{option}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="home-comment">
            <Form.Label className="fs-6">Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={involvedPersonState.notes}
              onChange={(e) =>
                setInvolvedPerson({
                  ...involvedPersonState,
                  notes: e.target.value,
                })
              }
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );

  function setInsurance(value) {
    setInvolvedPerson({ ...involvedPersonState, hasInsurance: value });
  }
};

export { OtherPartyPage };
OtherPartyPage.propTypes = propTypes;
