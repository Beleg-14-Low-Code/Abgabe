import { Card, Form, Row, Col } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "react-bootstrap/ToggleButton";
import { CustomToggleButton } from "../components/custom-toggle-button";

const propTypes = {
  radioState: PropTypes.any,
  setRradioState: PropTypes.func,
  accidentState: PropTypes.any,
  setAccidentState: PropTypes.func,
};

const AccidentCard = (props) => {
  const { radioState, setRradioState, accidentState, setAccidentState } = props;

  const radios = [
    { name: "Accident", value: "1" },
    { name: "Fire", value: "2" },
    { name: "Theft", value: "3" },
    { name: "Other", value: "4" },
  ];

  const date = new Date();
  let currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const result = date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // TODO set current date depend on locationState
  const prefillDate = (value) => {
    accidentState.happened === "1"
      ? setAccidentState({
          ...accidentState,
          dateOfIncident: result,
        })
      : setAccidentState({
          ...accidentState,
          dateOfIncident: value,
        });
  };

  return (
    <Form>
      <Card className="mb-3" style={{ width: "35rem" }}>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label className="fs-6 ">What's happened?</Form.Label>
            <Row>
              {radios.map((radio, idx) => (
                <>
                  <Col>
                    <ToggleButton
                      style={{ width: "7rem" }}
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant="outline-primary"
                      name="radio"
                      value={radio.value}
                      checked={radioState.value === radio.value}
                      required
                      onChange={(e) =>
                        setRradioState({
                          value: e.currentTarget.value,
                          name: radio.name,
                        })
                      }>
                      {radio.name}
                    </ToggleButton>
                    <Form.Control.Feedback type="invalid">
                      Please choose what happened.
                    </Form.Control.Feedback>
                  </Col>
                </>
              ))}
            </Row>
          </Form.Group>
          {radioState.value === "1" && (
            <>
              <CustomToggleButton
                id="happened"
                stateValue={accidentState.happened}
                setStateValue={setHappenedState}
                stateObject="happened"
                label="Has the accident Just happened?"
              />
              {accidentState.happened === "1" && (
                <CustomToggleButton
                  id="involved"
                  stateValue={accidentState.anyoneInvolved}
                  setStateValue={setAnyoneInvolved}
                  label="Is anyone involved injured or at risk?"
                />
              )}
              {accidentState.anyoneInvolved === "1" && (
                <CustomToggleButton
                  id="emergency-services"
                  stateValue={accidentState.emergencyServices}
                  setStateValue={setEmergencyServices}
                  label="Before we continue have you notified emergency services?"
                />
              )}
              <CustomToggleButton
                id="other-parties"
                stateValue={accidentState.otherPartiesInvolved}
                setStateValue={setOtherPartiesInvolved}
                label="Were there any other parties involved?"
              />
              <Form.Group className="mb-3" controlId="dateOfIncident">
                <Form.Label className="fs-6 ">When did it occcur?</Form.Label>
                <Form.Control
                  type="date"
                  name="date-of-incident"
                  value={accidentState.dateOfIncident}
                  onChange={(e) =>
                    setAccidentState({
                      ...accidentState,
                      dateOfIncident: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <CustomToggleButton
                id="location"
                stateValue={accidentState.location}
                setStateValue={setLocation}
                label="Did the incident occur at your current location?"
                // TODO add google map widget
              />
              {accidentState.location === "0" && (
                <CustomToggleButton
                  id="home-location"
                  stateValue={accidentState.home}
                  setStateValue={setHome}
                  label="Did the incident happen at home?"
                />
              )}
              {accidentState.home === "0" && (
                <Form.Group className="mb-3" controlId="home-comment">
                  <Form.Label className="fs-6">
                    Where were you when the incident happened?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={accidentState.locationComment}
                    onChange={(e) =>
                      setAccidentState({
                        ...accidentState,
                        locationComment: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              )}
              <CustomToggleButton
                id="police"
                stateValue={accidentState.police}
                setStateValue={setPolice}
                label="Have you officially reported this incident to the police?"
              />
              {accidentState.police === "1" && (
                <Form.Group className="mb-3" controlId="policy">
                  <Form.Label className="fs-6">
                    What is your crime reference number?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={accidentState.policeNumber}
                    onChange={(e) =>
                      setAccidentState({
                        ...accidentState,
                        policeNumber: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Form>
  );

  function setHappenedState(value) {
    setAccidentState({ ...accidentState, happened: value });
  }

  function setAnyoneInvolved(value) {
    setAccidentState({ ...accidentState, anyoneInvolved: value });
  }

  function setOtherPartiesInvolved(value) {
    setAccidentState({ ...accidentState, otherPartiesInvolved: value });
  }

  function setEmergencyServices(value) {
    setAccidentState({ ...accidentState, emergencyServices: value });
  }

  function setLocation(value) {
    setAccidentState({ ...accidentState, location: value });
  }

  function setHome(value) {
    setAccidentState({ ...accidentState, home: value });
  }

  function setPolice(value) {
    setAccidentState({ ...accidentState, police: value });
  }
};

export { AccidentCard };
AccidentCard.propTypes = propTypes;
