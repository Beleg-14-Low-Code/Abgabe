import { Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import ToggleButton from "react-bootstrap/ToggleButton";

const propTypes = {
  id: PropTypes.string,
  stateValue: PropTypes.string,
  setStateValue: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.string,
  stateObject: PropTypes.string,
};

const CustomToggleButton = (props) => {
  const { id, stateValue, setStateValue, label } = props;

  const yesNo = [
    { name: "Yes", value: "1" },
    { name: "No", value: "0" },
  ];
  return (
    <div>
      <Form.Group className="mb-3" controlId="justHappened">
        <Form.Label className="fs-6 ">{label}</Form.Label>
        <Row>
          {yesNo.map((element, idx) => (
            <>
              <Col>
                <ToggleButton
                  style={{ width: "15.6rem" }}
                  key={idx}
                  id={`${id}-${idx}`}
                  type="radio"
                  variant="outline-primary"
                  name={id}
                  required
                  value={element.value}
                  checked={stateValue === element.value}
                  onChange={(e) => setStateValue(e.currentTarget.value)}>
                  {element.name}
                </ToggleButton>
              </Col>
            </>
          ))}
        </Row>
      </Form.Group>
    </div>
  );
};

export { CustomToggleButton };
CustomToggleButton.propTypes = propTypes;
