import React, { useEffect, useState } from "react";
import BotArmy from "./BotArmy";
import BotCard from "./BotCard";
import { toast } from "react-toastify";
import _ from "lodash";

const BotCollection = () => {
  const [botData, setBotData] = useState([]);
  const [botArmy, setBotArmy] = useState([]);
  // const shuffledbots = _.shuffle(botData); //Randomize bot order using 1. import _ from 'lodash'; 2.const shuffledArray = _.shuffle(myArray);

  const toastNoDuplicateBotsWarning = (name) =>
    toast(
      `Bot ${name.toUpperCase()} is already in the army and cannot be added again!`,
      {
        type: "warning",
      }
    );
  const toastBotAddedToArmySuccessfully = (name) =>
    toast(`Bot ${name.toUpperCase()} has been sucessfully added to Army!`, {
      type: "success",
    });

  function addToArmy(botId) {
    const botArmyItem = botData.find((bot) => bot.id == botId);
    const matchingBot = botArmy.find((bot) => bot.id == botArmyItem.id);
    if (!matchingBot) {
      let updatedArmy = [...botArmy, botArmyItem];
      setBotArmy(updatedArmy);
      toastBotAddedToArmySuccessfully(botArmyItem.name);
    } else {
      toastNoDuplicateBotsWarning(botArmyItem.name);
    }
  }

  function deleteBot(botId) {
    console.log(botId);
    fetch(`http://localhost:4000/bots/${botId}`, {
      method: "DELETE",
    });
    const filteredBotCollectionData = botData.filter((bot) => bot.id != botId);
    setBotData(filteredBotCollectionData);

    const filteredBotArmyData = botArmy.filter((bot) => bot.id != botId);
    setBotArmy(filteredBotArmyData);
  }

  useEffect(() => {
    fetch(`http://localhost:4000/bots`)
      .then((res) => res.json())
      .then((data) => setBotData(data));
  }, []);

  const botCards = botData.map((bot) => (
    <BotCard
      onDeleteBot={deleteBot}
      onAddToArmy={addToArmy}
      key={bot.id}
      bot={bot}
    />
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
