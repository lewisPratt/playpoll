import { Link, Routes, Route } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage";

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
      </div>
    </>
  );
}
export default FrontPage;
