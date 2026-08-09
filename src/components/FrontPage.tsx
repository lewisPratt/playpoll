import { Link } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage";
import TestApi from "./TestApi";

function FrontPage() {
  return (
    <>
      <WelcomeMessage />
      <div id="frontpage-button-container">
        <Link to="/start-new">
          <button id="new-poll-button">Start</button>
        </Link>
        <Link to="/join">
          <button id="new-poll-button">Join</button>
        </Link>
        {/* <TestApi /> */}
      </div>
    </>
  );
}
export default FrontPage;
