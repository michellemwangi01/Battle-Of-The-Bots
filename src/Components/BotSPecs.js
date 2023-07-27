import React from "react";

const BotSPecs = ({ selectedBot }) => {
  const {
    avatar_url,
    armor,
    bot_class,
    catchphrase,
    created_at,
    damage,
    health,
    name,
    updated_at,
  } = selectedBot[0];
  console.log(selectedBot[0]);

  return (
    <div>
      <div class="projcard-container">
        <div class="projcard projcard-blue">
          <div class="projcard-innerbox">
            <img class="projcard-img" src={avatar_url} />
            <div class="projcard-textbox">
              <div class="projcard-title">
                {" "}
                <em>Name:</em> {name.toUpperCase()}
              </div>
              <div class="projcard-subtitle">
                <em>Catchphrase:</em> <br /> {catchphrase}
              </div>
              <div class="projcard-bar"></div>
              <div class="projcard-tagbox">
                <div class="projcard-tag">
                  <i class="fa-solid fa-shield"></i>Class: {bot_class}
                </div>
                <span class="projcard-tag">Health: {health}</span>
                <span class="projcard-tag">Damage: {damage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSPecs;
