import { Card, Form, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import { CustomFormControl } from "../pages/components/custom-form-control";
import "./first-page.css";
import React from "react";

const propTypes = {
  accidentState: PropTypes.any,
  radioState: PropTypes.any,
  involvedPersonState: PropTypes.any,
  damages: PropTypes.any
};

const SummaryPage = (props) => {
  const { accidentState, radioState, involvedPersonState, damages} = props;

  const [imgRect, setImgRect] = React.useState({})

  const handleLoad = (e) => {
    e.preventDefault();
    console.log(e.target.getBoundingClientRect());
    setImgRect(e.target.getBoundingClientRect());
  }

  const setupDamageReport = () => {
    let returnArray = [];
    if(damages.length > 0) {
      for (let i = 0; i < damages.length; i++) {
        returnArray.push(
          <div 
            className="damage-location" 
            style={{position: "absolute", backgroundColor: "#0cabf9",
                    width: "20px", height: "20px", borderRadius: "50%",
                    color: "white", fontSize: "18px", alignItems: "center",
                    display: "flex", justifyContent: "center",
                    left: damages[i].x + imgRect.left - 10 + "px",
                    top: damages[i].y + imgRect.top - 10 + "px"}}>
            {i + 1}
          </div>
        )
      }
    }
    return returnArray
  }

  const listDamages = () => {
    let ret = [];
    for (let i = 0; i < damages.length; i++) {
      ret.push(
        <ListGroupItem>Damage Location {i + 1}</ListGroupItem>
      )
    }
    return ret
  }

  return (
    <>
      <div className="App">
        <p>That's all we need to know</p>
        <h2>Please confirm the details below before submitting your claim</h2>
      </div>
      <div>
        <Row>
          <Col>
            <Card className="mb-3" style={{ width: "45vw" }}>
              <Card.Body>
                <p>About the incident</p>
                <CustomFormControl
                  {...{
                    firstDefaultValue: radioState.name,
                    secondDefaultValue: new Date(
                      accidentState.dateOfIncident
                    ).toLocaleDateString("de-DE"),
                    className: "fw-bold",
                    condition: true,
                    labelFirst: "What happened to the item(s)",
                    labelSecond: "When did it happen",
                  }}
                />
                {accidentState.happened === "1" && (
                  <CustomFormControl
                    {...{
                      firstDefaultValue:
                        accidentState.anyoneInvolved === "1" ? "Yes" : "No",
                      secondDefaultValue:
                        accidentState.emergencyServices === "1" ? "Yes" : "No",
                      condition: accidentState.anyoneInvolved === "1",
                      labelFirst: "Accident Injured parties",
                      labelSecond: "Accident Notified emergency services",
                      className: "fw-light",
                    }}
                  />
                )}
                <CustomFormControl
                  {...{
                    firstDefaultValue:
                      accidentState.location === "1" ? "Yes" : "No",
                    secondDefaultValue:
                      accidentState.home === "1" ? "Yes" : "No",
                    condition: accidentState.location === "0",
                    labelFirst: "Accident At current location",
                    labelSecond: "At residence",
                    className: "fw-light",
                  }}
                />
                {accidentState.home === "0" && (
                  <Row>
                    <Form.Group className="mb-3">
                      <Form.Label className="fs-6 fw-normal">
                        Address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="fw-light"
                        plaintext
                        readOnly
                        defaultValue={accidentState.locationComment}
                      />
                    </Form.Group>
                  </Row>
                )}
                <p>Police report</p>
                <CustomFormControl
                  {...{
                    firstDefaultValue:
                      accidentState.police === "1" ? "Yes" : "No",
                    secondDefaultValue: `${
                      accidentState.police === "1" ? "Yes" : "No"
                    } (${accidentState.policeNumber})`,
                    condition: accidentState.police === "1",
                    labelFirst: "Reported to police",
                    labelSecond: "Got crime reference number",
                    className: "fw-light",
                  }}
                />
                <p>Incident report</p>
                <p className="fw-light mb-3">{accidentState.description}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mb-3" style={{ width: "45vw", justifySelf: "center" }}>
              <Card.Body>
                <p1>Damage report</p1>
                <div style={{width: "100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
                <img 
                  src={require("./damage_location.png")}
                  alt={"damage locations"}
                  style={{width: "40vw", height: "55vh"}}
                  onLoad={(e) => {handleLoad(e)}} />
                </div>
                <ListGroup variant="flush">
                  {damages.length > 0 && listDamages()}
                </ListGroup>
              </Card.Body>
            </Card>
            {involvedPersonState.firstName !== "" && (
              <Card className="mb-3" style={{ width: "45vw" }}>
                <Card.Body>
                  <p>Other parties</p>
                  <hr />
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{`${involvedPersonState.firstName} ${involvedPersonState.lastName}`}</Accordion.Header>
                      <Accordion.Body>
                        <CustomFormControl
                          {...{
                            firstDefaultValue: involvedPersonState.firstName,
                            secondDefaultValue: involvedPersonState.lastName,
                            condition: true,
                            labelFirst: "First name",
                            labelSecond: "Last name",
                            className: "fw-light",
                          }}
                        />
                        <CustomFormControl
                          {...{
                            firstDefaultValue:
                              involvedPersonState.contactNumber,
                            secondDefaultValue: involvedPersonState.email,
                            condition: true,
                            labelFirst: "Contact number",
                            labelSecond: "Email",
                            className: "fw-light",
                          }}
                        />
                        <CustomFormControl
                          {...{
                            firstDefaultValue:
                              involvedPersonState.hasInsurance === "1"
                                ? "Yes"
                                : "No",
                            secondDefaultValue: involvedPersonState.insurance,
                            condition: true,
                            labelFirst: "Has insurance",
                            labelSecond: "Insurer",
                            className: "fw-light",
                          }}
                        />
                        <Row>
                          <Form.Group className="mb-3">
                            <Form.Label className="fs-6 fw-normal">
                              How were they involved?
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="fw-light"
                              plaintext
                              readOnly
                              defaultValue={involvedPersonState.howInvolved}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group className="mb-3">
                            <Form.Label className="fs-6 fw-normal">
                              Notes
                            </Form.Label>
                            <p className="fw-light mb-3">
                              {involvedPersonState.notes}
                            </p>
                          </Form.Group>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        {imgRect !== {} && setupDamageReport()}
      </div>
    </>
  );
};

export { SummaryPage };
SummaryPage.propTypes = propTypes;
