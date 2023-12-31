import "./App.css";
import "../src/Styles/CardStyles.css";
import BotCollection from "./Components/BotCollection";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BotFilter from "./Components/BotFilter";
import SortBar from "./Components/SortBar";
// import { BrowserRouter as Router, Route } from "react.router-dom";
function App() {
  const notify = () => toast("Wow so easy!");

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <BotCollection />
      <div id="copyrightContainer">
        <p id="copyrightText" style={{ color: "white", textAlign: "center" }}>
          &copy;2023 MichelleMwangi All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;
