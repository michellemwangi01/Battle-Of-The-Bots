import React from "react";

const BotCard = ({ bot, onAddToArmy }) => {
  const botId = bot.id;

  function addBotToArmy(e) {
    e.preventDefault();
    onAddToArmy(botId);
  }

  return (
    <div>
      <div key={bot.id} class="container">
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
        <di class="container__profile">
          <img src={bot.avatar_url} alt="people" />
          <div class="container__profile__text">
            <h2>Name: {bot.name}</h2>
            <p>
              <b>{bot.catchphrase}</b>
            </p>
            <button onClick={addBotToArmy} class="enlist">
              Enlist
            </button>
          </div>
        </di>
      </div>
    </div>
  );
};

export default BotCard;
