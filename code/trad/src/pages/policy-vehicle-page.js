import { Card, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import car from "./car.png";
import { AccidentCard } from "./components/accident-card";
import "./first-page.css";

const propTypes = {
  showNextPage: PropTypes.func,
  wert: PropTypes.number,
  name: PropTypes.string,
  marke: PropTypes.string,
  model: PropTypes.string,
  beschreibung: PropTypes.string,
  index: PropTypes.string,
  dbObject: PropTypes.any,
  radioState: PropTypes.any,
  setRradioState: PropTypes.func,
  accidentState: PropTypes.any,
  setAccidentState: PropTypes.func,
};

const PolicyVechiclePage = (props) => {
  const {
    wert,
    name,
    marke,
    model,
    beschreibung,
    radioState,
    setRradioState,
    accidentState,
    setAccidentState,
  } = props;

  return (
    <>
      <div className="App">
        <p>Sorry to hear something has happened to your vehicle.</p>
        <h2>Can you tell us a bit about what happened?</h2>
      </div>
      <div>
        <Card className="mb-3" style={{ width: "35rem" }}>
          <Card.Body>
            <Form.Group size="sm">
              <Row>
                <Col md={4}>
                  <p className=" fs-6 mb-1 text-start">Policy number</p>
                  <p className=" fs-4  text-start"> {name}</p>
                </Col>
                <Col
                  md={{
                    span: 4,
                    offset: 4,
                  }}>
                  <p className="fs-6 mb-1 text-end">Value</p>
                  <p className="fs-4 text-end">{wert}€</p>
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <Card.Img src={car} alt="Car image" />
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <p className=" fs-6 mb-1 text-start">Make</p>
                      <p className=" fs-4 text-start">{marke}</p>
                    </Col>
                    <Col>
                      <p className=" fs-6 mb-1 text-start">Model</p>
                      <p className=" fs-4 text-start">{model}</p>
                    </Col>
                  </Row>
                  <p className=" fs-6 text-start">{beschreibung}</p>
                </Col>
              </Row>
            </Form.Group>
          </Card.Body>
        </Card>
        <AccidentCard
          {...{
            radioState,
            setRradioState,
            accidentState,
            setAccidentState,
          }}
        />
      </div>
    </>
  );
};

export { PolicyVechiclePage };
PolicyVechiclePage.propTypes = propTypes;
