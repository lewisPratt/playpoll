import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import FrontPage from "./components/FrontPage";
import StartNewPoll from "./components/StartNewPoll";
import JoinExistingPoll from "./components/JoinExistingPoll";
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <section id="main-content">
          <Outlet />

          <Routes>
            <Route path="/start-new" element={<StartNewPoll />} />
            <Route path="/join" element={<JoinExistingPoll />} />
            <Route path="/" element={<FrontPage />} />
          </Routes>
        </section>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default Layout;
