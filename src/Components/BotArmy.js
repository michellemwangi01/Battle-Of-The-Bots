import React, { useEffect, useState } from "react";

const BotArmy = ({ bot, onArmyRemove }) => {
  let botName = bot.name;
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
          <div class="container__info" id="Army_Info">
            <span>
              <i class="fas fa-eye"></i> A-{bot.armor}
            </span>
            <span>
              <i class="fas fa-comment-alt"></i> H-{bot.health}
            </span>
            <span>
              <i class="fas fa-download"></i> D-{bot.damage}
            </span>
          </div>
          <h2 id="botName">{bot.name.toUpperCase()}</h2>
          <p style={{ color: "grey" }}>{bot.bot_class}</p>

          <div class="container__profile__Army  ">
            <img src={bot.avatar_url} alt="people" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotArmy;
