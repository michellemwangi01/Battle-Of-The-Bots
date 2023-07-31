import React, { useEffect, useState } from "react";

const SortBar = ({ botData, setBotData }) => {
  const inputHandler = (e) => {
    let sortChoice = e.target.value;
    const sortedBots = [...botData].sort((a, b) => {
      if (sortChoice === "health") {
        return b.health - a.health;
      } else if (sortChoice === "armor") {
        return b.armor - a.armor;
      } else if (sortChoice === "damage") {
        return b.damage - a.damage;
      } else {
        return 0;
      }
    });
    setBotData(sortedBots);
  };

  return (
    <div>
      <form id="sortForm">
        <p> Sort by:</p>
        <select id="sortSelect" onChange={inputHandler}>
          <option>Select</option>
          <option value="health">Health</option>
          <option value="damage">Damage</option>
          <option value="armor">Armor</option>
        </select>
      </form>
    </div>
  );
};

export default SortBar;
