import "./App.css";
import "../src/Styles/CardStyles.css";
import BotCollection from "./Components/BotCollection";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BotSPecs from "./Components/BotSPecs";

function App() {
  const notify = () => toast("Wow so easy!");

  return (
    <div className="App">
      {/* <button onClick={notify}>Toastttt</button> */}
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
    </div>
  );
}

export default App;
