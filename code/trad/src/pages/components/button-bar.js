import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const propTypes = {
  showNextPage: PropTypes.func,
  showPreviousPage: PropTypes.func,
};

const ButtonBar = (props) => {
  const { showNextPage, showPreviousPage } = props;
  return (
    <>
      <Row className="mb-3">
        <Col>
          <Button onClick={showPreviousPage}>Back</Button>
        </Col>
        <Col>
          <Button onClick={showNextPage}>Next</Button>
        </Col>
      </Row>
    </>
  );
};

export { ButtonBar };
ButtonBar.propTypes = propTypes;
