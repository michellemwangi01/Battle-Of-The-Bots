import "./App.css";
import "../src/Styles/CardStyles.css";
import BotCollection from "./Components/BotCollection";
import BotArmy from "./Components/BotArmy";

function App() {
  return (
    <div className="App">
      <BotArmy />
      <BotCollection />
    </div>
  );
}

export default App;
