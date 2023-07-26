import React, { useEffect, useState } from "react";
import BotArmy from "./BotArmy";
import BotCard from "./BotCard";

const BotCollection = () => {
  const [botData, setBotData] = useState([]);
  const [addToArmyID, setAddToArmyID] = useState();
  const [botArmy, setBotArmy] = useState([]);

  function addToArmy(botId) {
    const botArmyItem = botData.find((bot) => bot.id == botId);
    const matchingBot = botArmy.find((bot) => bot.id == botArmyItem.id);
    if (!matchingBot) {
      let updatedArmy = [...botArmy, botArmyItem];
      setBotArmy(updatedArmy);
    }
  }
  console.log(botArmy);
  useEffect(() => {
    fetch(`http://localhost:4000/bots`)
      .then((res) => res.json())
      .then((data) => setBotData(data));
  }, []);

  const botCards = botData.map((bot) => (
    <BotCard
      onAddToArmy={addToArmy}
      // setAddToArmyID={setAddToArmyID}
      key={bot.id}
      bot={bot}
    />
  ));

  return (
    <div>
      <BotArmy addToArmyID={addToArmyID} botData={botData} />
      <h1 id="BotCollectionTitle">The Bot Collection</h1>
      <div className="botCollection">{botCards}</div>
    </div>
  );
};

export default BotCollection;
