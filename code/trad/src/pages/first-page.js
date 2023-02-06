import "./first-page.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PropTypes from "prop-types";

const propTypes = {
  showNextPage: PropTypes.func.isRequired,
};

const FirstPage = (props) => {
  return (
    <div className="App">
      <h1>Welcome to Insure Inc</h1>
      <p>
        Welcome to the Insure Inc claims portal where you can make a claim
        against your policy.
      </p>
    </div>
  );
};

export { FirstPage };
FirstPage.propTypes = propTypes;
