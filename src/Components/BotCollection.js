import React, { useEffect, useState } from "react";
import BotArmy from "./BotArmy";
import BotCard from "./BotCard";
import { toast } from "react-toastify";
import _ from "lodash";
import BotSPecs from "./BotSPecs";
import BotFilter from "./BotFilter";

const BotCollection = () => {
  const [botData, setBotData] = useState([]);
  const [botArmy, setBotArmy] = useState([]);
  const [viewBotDetailsBool, setViewBotDetailsBool] = useState(false);
  const [selectedBot, setSelectedBot] = useState({});
  const shuffledbots = _.shuffle(botData); //Randomize bot order using 1. import _ from 'lodash'; 2.const shuffledArray = _.shuffle(myArray);

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

    const deletedBot = botData.find((bot) => bot.id == botId);

    toastBotDeletedSuccessfully(deletedBot.name);
  }

  function removeFromArmy(botId) {
    const remainingArmyBots = botArmy.filter((bot) => bot.id != botId);
    setBotArmy(remainingArmyBots);
    const removedFromArmyBot = botData.find((bot) => bot.id == botId);
    toastBotRemovedFromArmy(removedFromArmyBot.name);
  }

  function viewBotDetails(botId) {
    setViewBotDetailsBool((prevState) => !prevState);
    console.log(viewBotDetailsBool);
    const selectedBot = botData.filter((bot) => bot.id == botId);
    setSelectedBot(selectedBot);
  }

  //console.log(viewBotDetailsBool);
  useEffect(() => {
    fetch(`http://localhost:4000/bots`)
      .then((res) => res.json())
      .then((data) => setBotData(data));
  }, []);

  const botCards = shuffledbots.map((bot) => (
    <BotCard
      onViewBotDetails={viewBotDetails}
      onDeleteBot={deleteBot}
      onAddToArmy={addToArmy}
      key={bot.id}
      bot={bot}
    />
  ));

  const botArmyCards = botArmy.map((bot) => (
    <BotArmy onArmyRemove={removeFromArmy} key={bot.id} bot={bot} />
  ));

  // *************************** TOAST ********************************
  const toastNoDuplicateBotsWarning = (name) =>
    toast(
      `Bot ${name.toUpperCase()} is already in the army and cannot be added again!`,
      {
        type: "warning",
      }
    );
  const toastBotAddedToArmySuccessfully = (name) =>
    toast(`Bot ${name.toUpperCase()} sucessfully added to Army!`, {
      type: "success",
    });

  const toastBotDeletedSuccessfully = (name) =>
    toast(`Bot ${name.toUpperCase()} sucessfully deleted!`, {
      type: "success",
    });

  const toastBotRemovedFromArmy = (name) =>
    toast(`Bot ${name.toUpperCase()} removed from the army!`, {
      type: "success",
    });

  return (
    <div>
      <div className="armyBotsContainer">
        <h1 id="BATTLEOFTHEBOTS">BATTLE OF THE BOTS</h1>
        <div className="botArmy">{botArmyCards}</div>
      </div>

      <div>
        {/* {viewBotDetailsBool ? (
          <h1 id="BotCollectionTitle"> Bot Specifications</h1>
        ) : (
          <h1 id="BotCollectionTitle"> The Bot Collection</h1>
        )} */}
        <div id="filterContainer">
          <p>Bots on Display: {botData.length}</p>
          <BotFilter botData={botData} setBotData={setBotData} />
        </div>
        {viewBotDetailsBool ? (
          <div className="botCollection">
            <BotSPecs
              onAddToArmy={addToArmy}
              setViewBotDetailsBool={setViewBotDetailsBool}
              selectedBot={selectedBot}
            />
          </div>
        ) : (
          <div className="botCollection">{botCards}</div>
        )}
      </div>
    </div>
  );
};

export default BotCollection;
