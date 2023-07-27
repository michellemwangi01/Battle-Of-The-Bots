import React, { useEffect, useState } from "react";

const BotArmy = ({ bot, onArmyRemove }) => {
  const botID = bot.id;
  function removeFromArmy() {
    console.log(botID);
    onArmyRemove(botID);
  }

  return (
    <div>
      <div>
        <div
          onClick={removeFromArmy}
          key={bot.id}
          class="container container_Army"
        >
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
          <h2 id="botName">{bot.name}</h2>
          <div class="container__profile__Army  ">
            <img src={bot.avatar_url} alt="people" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotArmy;
