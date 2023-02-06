import "./first-page.css";
import { Card, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import CardHeader from "react-bootstrap/esm/CardHeader";

const propTypes = {
  type: PropTypes.string,
  setType: PropTypes.func,
  itemID: PropTypes.any,
};

const SecondPage = (props) => {
  const { type, setType, itemID } = props;
  return (
    <div className="App">
      <p>Let's find your policy</p>
      <h1>What can you tell us about your policy</h1>
      <Card className="mb-3">
        <CardHeader>Select your policy</CardHeader>
        <Card.Body>
          <Form.Group>
            <Form.Select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              aria-label="Floating label select example">
              <option>Choose policy</option>
              {itemID.map((wert) => {
                return <option value={wert}>{wert}</option>;
              })}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>
    </div>
  );
};

export { SecondPage };
SecondPage.propTypes = propTypes;
