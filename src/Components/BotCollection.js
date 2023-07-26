import React, { useEffect, useState } from "react";

const BotCollection = () => {
  const [botData, setBotData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/bots`)
      .then((res) => res.json())
      .then((data) => setBotData(data));
  }, []);

  const botCards = botData.map((bot) => (
    <div class="container">
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
        </div>
      </di>
    </div>
  ));

  console.log(botData);
  return (
    <div>
      <h1 id="BotCollectionTitle">The Bot Collection</h1>
      <div className="botCollection">{botCards}</div>
    </div>
  );
};

export default BotCollection;
