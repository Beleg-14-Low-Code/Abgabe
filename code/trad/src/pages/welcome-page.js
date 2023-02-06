import "bootstrap/dist/css/bootstrap.min.css";
import { FirstPage } from "./first-page";
import { PolicyVechiclePage } from "./policy-vehicle-page";
import { SecondPage } from "./second-page";
import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "./first-page.css";
import { ButtonBar } from "./components/button-bar";
import { OtherPartyPage } from "./other-party-page";
import { DamageReportPage } from "./damage-report-page";
import { DescriptionPage } from "./description-page";
import { SummaryPage } from "./summary-page";
import { SubmittedClaim } from "./submitted-claim";
import PropTypes from "prop-types";

const propTypes = { item: PropTypes.any };

const WelcomePage = (props) => {
  const { item } = props;
  const [nextPage, setNextPage] = useState(0);
  const [type, setType] = useState("");

  const [radioState, setRradioState] = useState({ value: "", name: "" });
  const [accidentState, setAccidentState] = useState({
    happened: "",
    anyoneInvolved: "",
    otherPartiesInvolved: "",
    emergencyServices: "",
    dateOfIncident: "",
    location: "",
    home: "",
    locationComment: "",
    police: "",
    policeNumber: "",
    description: "",
  });
  const [involvedPersonState, setInvolvedPerson] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    hasInsurance: "",
    insurance: "",
    howInvolved: "",
    notes: "",
  });
  const [damages, setDamages] = useState([]);

  const showNextPage = () => {
    setNextPage(nextPage + 1);
  };

  const goToHomePage = () => {
    setNextPage(0);
    setRradioState({ value: "", name: "" });
    setType("");
    setAccidentState({
      ...accidentState,
      happened: "",
      anyoneInvolved: "",
      otherPartiesInvolved: "",
      emergencyServices: "",
      dateOfIncident: "",
      location: "",
      home: "",
      locationComment: "",
      police: "",
      policeNumber: "",
      description: "",
    });
    setInvolvedPerson({
      ...involvedPersonState,
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
      hasInsurance: "",
      insurance: "",
      howInvolved: "",
      notes: "",
    });
  };

  const itemID = item.map(function (element) {
    return element.id;
  });

  let index = item.findIndex((item) => item.id === +type);

  const showPreviousPage = () => {
    setNextPage(nextPage - 1);
  };

  return (
    <>
      <header className="App-header">
        {nextPage === 0 && <FirstPage {...{ showNextPage }} />}
        {nextPage === 1 && <SecondPage {...{ type, setType, itemID }} />}
        {nextPage === 2 && type && (
          <PolicyVechiclePage
            {...{
              name: item[index].name,
              wert: item[index].wert,
              marke: item[index].marke,
              model: item[index].modell,
              beschreibung: item[index].beschreibung,
              radioState,
              setRradioState,
              accidentState,
              setAccidentState,
            }}
          />
        )}
        {nextPage === 3 && accidentState.otherPartiesInvolved === "1" && (
          <OtherPartyPage {...{ involvedPersonState, setInvolvedPerson }} />
        )}
        {((nextPage === 3 && accidentState.otherPartiesInvolved === "0") ||
          (nextPage === 4 && accidentState.otherPartiesInvolved === "1")) && (
            <DamageReportPage {...{damages, setDamages}}/>
          )}
        {((nextPage === 4 && accidentState.otherPartiesInvolved === "0") ||
          (nextPage === 5 && accidentState.otherPartiesInvolved === "1")) && (
          <DescriptionPage {...{ accidentState, setAccidentState }} />
        )}
        {((nextPage === 5 && accidentState.otherPartiesInvolved === "0") ||
          (nextPage === 6 && accidentState.otherPartiesInvolved === "1")) && (
          <SummaryPage
            {...{ accidentState, radioState, involvedPersonState, damages }}
          />
        )}
        {((nextPage === 6 && accidentState.otherPartiesInvolved === "0") ||
          (nextPage === 7 && accidentState.otherPartiesInvolved === "1")) && (
          <SubmittedClaim />
        )}
        {nextPage === 0 ? (
          <Button onClick={showNextPage}>MAKE A CLAIM</Button>
        ) : (nextPage === 5 && accidentState.otherPartiesInvolved === "0") ||
          (nextPage === 6 && accidentState.otherPartiesInvolved === "1") ? (
          <>
            <Row className="mb-3">
              <Col>
                <Button onClick={showPreviousPage}>Back</Button>
              </Col>
              <Col>
                <Button onClick={showNextPage} style={{ width: "9rem" }}>
                  SUBMIT CLAIM
                </Button>
              </Col>
            </Row>
          </>
        ) : (nextPage === 6 && accidentState.otherPartiesInvolved === "0") ||
          (nextPage === 7 && accidentState.otherPartiesInvolved === "1") ? (
          <Button onClick={goToHomePage}>Return to home page</Button>
        ) : (
          <ButtonBar {...{ showNextPage, showPreviousPage }} />
        )}
      </header>
    </>
  );
};

export default WelcomePage;
WelcomePage.propTypes = propTypes;
