import React, { useEffect, useState } from "react";
import BotArmy from "./BotArmy";
import BotCard from "./BotCard";
import { ToastContainer, toast } from "react-toastify";

const BotCollection = () => {
  const [botData, setBotData] = useState([]);
  const [addToArmyID, setAddToArmyID] = useState();
  const [botArmy, setBotArmy] = useState([]);

  const noDuplicateBotsWarning = (name) =>
    toast(
      `Bot ${name.toUpperCase()} is already in the army and cannot be added again!`,
      {
        type: "warning",
      }
    );
  const botAddedToArmySuccessfully = (name) =>
    toast(`Bot ${name.toUpperCase()} has been sucessfully added to Army!`, {
      type: "success",
    });

  function addToArmy(botId) {
    const botArmyItem = botData.find((bot) => bot.id == botId);
    const matchingBot = botArmy.find((bot) => bot.id == botArmyItem.id);
    if (!matchingBot) {
      let updatedArmy = [...botArmy, botArmyItem];
      setBotArmy(updatedArmy);
      botAddedToArmySuccessfully(botArmyItem.name);
    } else {
      noDuplicateBotsWarning(botArmyItem.name);
    }
  }

  const randomNum = Math.floor(Math.random() * 100) + 1;

  useEffect(() => {
    fetch(`http://localhost:4000/bots`)
      .then((res) => res.json())
      .then((data) => setBotData(data));
  }, []);

  const botCards = botData.map((bot) => (
    <BotCard onAddToArmy={addToArmy} key={bot.id} bot={bot} />
  ));

  const botArmyCards = botArmy.map((bot) => <BotArmy key={bot.id} bot={bot} />);

  return (
    <div>
      <div className="armyBotsContainer">
        <h1 id="BATTLEOFTHEBOTS">BATTLE OF THE BOTS</h1>
        <div className="botArmy">{botArmyCards}</div>
      </div>
      <div>
        <h1 id="BotCollectionTitle">The Bot Collection</h1>
        <div className="botCollection">{botCards}</div>
      </div>
    </div>
  );
};

export default BotCollection;
