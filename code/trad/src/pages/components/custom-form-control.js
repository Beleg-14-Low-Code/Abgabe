import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const propTypes = {
  firstDefaultValue: PropTypes.string,
  secondDefaultValue: PropTypes.string,
  className: PropTypes.string,
  condition: PropTypes.bool,
  labelFirst: PropTypes.string,
  labelSecond: PropTypes.string,
};

const CustomFormControl = (props) => {
  const {
    firstDefaultValue,
    secondDefaultValue,
    className,
    condition,
    labelFirst,
    labelSecond,
  } = props;

  return (
    <>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="fs-6 fw-normal">{labelFirst}</Form.Label>
            <Form.Control
              type="text"
              plaintext
              readOnly
              defaultValue={firstDefaultValue}
              className={className}
            />
          </Form.Group>
        </Col>
        {condition && (
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="fs-6 fw-normal">{labelSecond}</Form.Label>
              <Form.Control
                className={className}
                type="text"
                plaintext
                readOnly
                defaultValue={secondDefaultValue}
              />
            </Form.Group>
          </Col>
        )}
      </Row>
    </>
  );
};

export { CustomFormControl };
CustomFormControl.propTypes = propTypes;
