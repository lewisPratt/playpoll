import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import FrontPage from "./components/FrontPage";
import StartNewPoll from "./components/StartNewPoll";
import JoinExistingPoll from "./components/JoinExistingPoll";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <section id="main-content">
        <BrowserRouter>
          <Link to="/">Home</Link>

          <Routes>
            <Route path="/start-new" element={<StartNewPoll />} />
            <Route path="/join" element={<JoinExistingPoll />} />
            <Route path="/" element={<FrontPage />} />
          </Routes>
        </BrowserRouter>
      </section>
      <div id="spacer"></div>
      <Footer />
    </>
  );
}

export default Layout;
