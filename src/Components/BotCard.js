import React from "react";
// import { Router, Route } from "rea";
// import { NavLink } from "react-router-dom";

const BotCard = ({ bot, onAddToArmy, onDeleteBot, onViewBotDetails }) => {
  const botId = bot.id;

  function addBotToArmy(e) {
    e.preventDefault();
    onAddToArmy(botId);
  }

  function deleteHandler() {
    onDeleteBot(botId);
  }

  function botCardHandler() {
    //console.log(botId);
    onViewBotDetails(botId);
  }
  return (
    <div>
      <div onDoubleClick={addBotToArmy} key={bot.id} class="container">
        <div class="container__info">
          <span>
            <i class="fas fa-eye"></i> {bot.armor}3
          </span>
          <span>
            <i class="fas fa-comment-alt"></i> {bot.health}2
          </span>
          <span>
            <i class="fas fa-download"></i> {bot.damage}1
          </span>
        </div>
        <div class="container__profile">
          <img src={bot.avatar_url} alt="people" />
          <div class="container__profile__text">
            <h2>Name: {bot.name}</h2>
            <p>
              <b>{bot.catchphrase}</b>
            </p>
            <div className="enlistAndDelete">
              <button onClick={botCardHandler} class="enlist">
                View Details
              </button>
              <i
                onClick={deleteHandler}
                class="fas fa-window-close fa-lg"
                style={{ color: "#e00b0b", fontSize: "2rem" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotCard;
