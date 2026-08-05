import { Link, Routes, Route } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage";

function FrontPage() {
  return (
    <>
      <WelcomeMessage />
      <div id="frontpage-button-container">
        <Link to="/start-new">
          <button id="new-poll-button">I'd like to start a new poll</button>
        </Link>
        <Link to="/join">
          <button id="new-poll-button">Join a Poll</button>
        </Link>
      </div>
    </>
  );
}
export default FrontPage;
