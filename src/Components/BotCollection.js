import React, { useEffect, useState } from "react";
import BotArmy from "./BotArmy";
import BotCard from "./BotCard";
import { toast } from "react-toastify";
import _ from "lodash";
import BotSPecs from "./BotSPecs";
import BotFilter from "./BotFilter";
import SortBar from "./SortBar";

const BotCollection = () => {
  const localdb = `http://localhost:4000/bots/`;
  const renderdb = `https://db-battleofthebots.onrender.com/bots/`;
  const [botData, setBotData] = useState([]);
  const [botArmy, setBotArmy] = useState([]);
  const [viewBotDetailsBool, setViewBotDetailsBool] = useState(false);
  const [selectedBot, setSelectedBot] = useState({});
  const shuffledbots = _.shuffle(botData); //Randomize bot order using 1. import _ from 'lodash'; 2.const shuffledArray = _.shuffle(myArray);
  const [botArmyClasses, setBotArmyClasses] = useState([]);
  const [itemsNotLoaded, setItemsNotLoaded] = useState(true);

  function addToArmy(botId) {
    const botArmyItem = botData.find((bot) => bot.id === botId);

    const matchingBot = botArmy.find((bot) => {
      return bot.id == botArmyItem.id;
    });
    if (!matchingBot) {
      const sameClassBots = botArmy.filter(
        (bot) => bot.bot_class === botArmyItem.bot_class
      );
      if (sameClassBots.length > 0) {
        toastNoDuplicateClassBotsWarning(botArmyItem.bot_class);
        return;
      } else {
        let updatedArmy = [...botArmy, botArmyItem];
        setBotArmy(updatedArmy);
        //removing bots from bot collection that have been added to the army
        // const botsNotInArmy = botData.filter((bot) => bot.id != botArmyItem.id);
        // setBotData(botsNotInArmy);
        toastBotAddedToArmySuccessfully(botArmyItem.name);
      }
    } else {
      toastNoDuplicateBotsWarning(botArmyItem.name);
    }
  }

  function deleteBot(botId) {
    console.log(botId);
    fetch(`${renderdb}${botId}`, {
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
    // setBotData([...botData, removedFromArmyBot]);
    toastBotRemovedFromArmy(removedFromArmyBot.name);
  }

  function viewBotDetails(botId) {
    setViewBotDetailsBool((prevState) => !prevState);
    console.log(viewBotDetailsBool);
    const selectedBot = botData.filter((bot) => bot.id == botId);
    setSelectedBot(selectedBot);
  }

  console.log(itemsNotLoaded);
  useEffect(() => {
    fetch(`${renderdb}`)
      .then((res) => res.json())
      .then((data) => {
        setBotData(data);
        setItemsNotLoaded(false);
        console.log(itemsNotLoaded);
      });
  }, []);

  const botCards = botData.map((bot) => (
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

  console.log(botArmy);

  // *************************** TOAST ********************************
  const toastNoDuplicateBotsWarning = (name) =>
    toast(
      `Bot ${name.toUpperCase()} is already in the army and cannot be added again!`,
      {
        type: "warning",
      }
    );
  const toastNoDuplicateClassBotsWarning = (botClass) =>
    toast(
      `A bot of class "${botClass}" already exists in the army! To trade it, please remove it first.`,
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
        {viewBotDetailsBool ? (
          <h1 id="BotCollectionTitle"> Bot Specifications</h1>
        ) : (
          <>
            <h1 id="BotCollectionTitle"> The Bot Collection</h1>
            <div id="filterContainer">
              <SortBar botData={botData} setBotData={setBotData} />
              <BotFilter botData={botData} setBotData={setBotData} />
            </div>
            {itemsNotLoaded && (
              <em>
                <h1 id="loadingBots">Bot Collection Loading...</h1>
              </em>
            )}
          </>
        )}
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
